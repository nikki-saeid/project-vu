import { parsePostGisPoint } from '@/lib/helpers/postgis';
import { ProjectWithLatLng } from '@/lib/types/api';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import { storageRepository } from '../repositories/storage.repository';
import { Project } from '@/lib/types/db';
import { randomUUID } from 'crypto';

export const storageService = {
    // resize image to webp format
    resizeImageToWebp: async function (file: File, width: number, height: number, isCircle = false) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let image = sharp(buffer).resize(width, height, {
            fit: 'cover',
            position: 'center',
        });

        if (isCircle) {
            const circleMask = Buffer.from(`
      <svg width="${width}" height="${height}">
        <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 2}" fill="white"/>
      </svg>
    `);

            image = image.composite([
                {
                    input: circleMask,
                    blend: 'dest-in', // this "cuts the corners"
                },
            ]);
        }

        return await image.webp({ quality: 80 }).toBuffer();
    },

    qualityUpdateImageToWebp: async function (file: File, quality: number) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return await sharp(buffer).webp({ quality }).toBuffer();
    },

    // upload after resize
    uploadAfterResize: async function (path: string, file: File | null, width: number, height: number, isCircle = false) {
        if (!(file instanceof File)) {
            throw { error: new Error('Missing file'), status: StatusCodes.BAD_REQUEST };
        }

        const buffer = await this.resizeImageToWebp(file, width, height, isCircle);

        return await storageRepository.upload(path, buffer);
    },

    uploadAfterQualityUpdate: async function (path: string, file: File | null, quality: number) {
        if (!(file instanceof File)) {
            throw { error: new Error('Missing file'), status: StatusCodes.BAD_REQUEST };
        }

        const buffer = await this.qualityUpdateImageToWebp(file, quality);

        return await storageRepository.upload(path, buffer);
    },

    // bulk upload
    uploadMany: async function (images: File[] = [], path: string) {
        // Save each image in the formData 'files' array to Supabase storage, one-by-one:
        const uploadResults = await Promise.all(
            images.map(async (file) => {
                const id = randomUUID();
                if (!(file instanceof File)) {
                    return {
                        name: (file as unknown as File)?.name ?? 'unknown',
                        error: new Error('Not a valid file'),
                    };
                }

                try {
                    // change extension to .webp
                    const fileName = `image-${id}.webp`;
                    const filePath = `${path}/${fileName}`;

                    await storageService.uploadAfterQualityUpdate(filePath, file, 80);
                    return { name: fileName };
                } catch (error) {
                    return { name: file.name, error };
                }
            }),
        );

        // Collect the first error if any
        const uploadError = uploadResults.find((r) => r.error)?.error;
        if (uploadError) throw uploadError;

        // Store the uploadResults public urls to project_image
        const projectImages = [];
        for (const result of uploadResults) {
            if (!result.error) {
                const url = `${path}/${result.name}`;
                projectImages.push(url);
            }
        }

        return projectImages;
    },

    // remove many
    removeMany: async function (paths: string[]) {
        return await storageRepository.removeMany(paths);
    },

    getProjectStoragePublicUrls: async function (project: Project) {
        // project location
        const coords = parsePostGisPoint(project.location as string | null);
        // get the images
        const images = project.images_urls ?? [];

        // get the public urls
        const publicUrls = await Promise.all(images.map(async (image) => await storageRepository.getStoragePublicUrl(image)));

        return {
            ...project,
            images_urls: publicUrls,
            ...(coords && { lng: coords.lng, lat: coords.lat }),
        };
    },

    // get storage public urls
    getProjectsStoragePublicUrls: async function (projects: Project[]) {
        const _projects: ProjectWithLatLng[] = [];
        for (let i = 0; i < projects.length; i++) {
            _projects.push(await this.getProjectStoragePublicUrls(projects[i]));
        }

        return _projects;
    },
};
