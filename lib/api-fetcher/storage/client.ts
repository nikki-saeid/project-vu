'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { createClient } from '@/lib/supabase/client';
import { CreateSignedUploadUrlResponse } from '@/lib/types/api';
import { generateUniqueId } from '../user/server/projects';
import { BUCKET_NAME } from '@/lib/constants/storage';

export async function uploadProjectFiles(files: File[], projectIdEx?: string, images_urls?: string[] | null) {
    const images: string[] = [];
    const projectId = projectIdEx ?? (await generateUniqueId());

    for (const file of files) {
        // upload the file
        const uploadedFilePath = await uploadFileByProjectIdIfNotExist(file, projectId, images_urls ?? []);
        if (!uploadedFilePath) continue;

        // add the image to the project
        images.push(uploadedFilePath);
    }

    // remove images
    const removedImages = images_urls ? images_urls.filter((image) => !images.includes(image)) : [];
    if (removedImages.length > 0) {
        await removeMany(removedImages);
    }

    // return the images
    return { images_urls: images, projectId };
}

export async function uploadFileByProjectIdIfNotExist(file: File, projectId: string, images_urls: string[]) {
    // skip if file already exists in the project
    const path = fileExists(file.name, images_urls);

    if (path) {
        return path;
    }

    // get the signed url
    const signUpUrl = await signedUpUploadUrl(file.type, projectId);
    if (!signUpUrl) return null;

    // upload the file
    const supabase = createClient();
    const { error, data } = await supabase.storage.from(BUCKET_NAME).uploadToSignedUrl(signUpUrl.path, signUpUrl.token, file);
    if (error) throw error;

    return data.path;
}

function fileExists(fileName: string, images_urls: string[]) {
    return images_urls.find((image) => image.split('/').includes(fileName));
}

export async function signedUpUploadUrl(fileType: string, projectId: string) {
    const response = await fetcher<CreateSignedUploadUrlResponse>(`${API_URL}/storage/signed-upload-url/${projectId}?fileType=${fileType}`);
    if (!response.data) return null;
    return response.data;
}

export async function removeMany(paths: string[]) {
    const supabase = createClient();
    const { error } = await supabase.storage.from(BUCKET_NAME).remove(paths);

    if (error) throw error;

    return paths;
}
