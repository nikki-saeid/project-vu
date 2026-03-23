import { parsePostGisPoint } from '@/lib/helpers/postgis';
import { ProjectWithImages } from '@/lib/types/api';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import { storageRepository } from '../repositories/storage.repository';

export const storageService = {
    // resize image to webp format
    resizeImageToWebp: async function (file: File, width: number, height: number) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return await sharp(buffer).resize(width, height).webp({ quality: 80 }).toBuffer();
    },

    // upload after resize
    uploadAfterResize: async function (path: string, file: File | null, width: number, height: number) {
        if (!(file instanceof File)) {
            throw { error: new Error('Missing file'), status: StatusCodes.BAD_REQUEST };
        }

        const buffer = await this.resizeImageToWebp(file, width, height);

        return await storageRepository.upload(path, buffer);
    },

    // remove many
    removeMany: async function (paths: string[]) {
        return await storageRepository.removeMany(paths);
    },

    // get storage public urls
    getStoragePublicUrls: async function (projects: ProjectWithImages[]) {
        const _projects: ProjectWithImages[] = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const images = (project.project_image ?? []).sort(
                (a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order,
            );
            const coords = parsePostGisPoint(project.location as string | null);

            const publicUrls = await Promise.all(images.map(async (image) => await storageRepository.getStoragePublicUrl(image.image_url)));

            _projects.push({
                ...project,
                project_image: images.map((image, index) => ({ ...image, image_url: publicUrls[index] })),
                ...(coords && { lng: coords.lng, lat: coords.lat }),
            });
        }

        return _projects;
    },
};
