import { projectImagesRepository } from '../repositories/project-images.repository';
import { storageService } from './storage.service';

export const projectImagesService = {
    // get business by user id or create if not exists
    createManyImagesByProjectId: async function (images: File[] = [], projectId: string, path: string) {
        // Save each image in the formData 'files' array to Supabase storage, one-by-one:
        const uploadResults = await Promise.all(
            images.map(async (file) => {
                if (!(file instanceof File)) {
                    return {
                        name: (file as unknown as File)?.name ?? 'unknown',
                        error: new Error('Not a valid file'),
                    };
                }

                try {
                    // change extension to .webp
                    const fileName = file.name.replace(/\.[^/.]+$/, '');
                    const filePath = `${path}/${fileName}-${Date.now()}.webp`;
                    return { name: await storageService.uploadAfterResize(filePath, file, 500, 460) };
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
        let displayOrder = 0;
        for (const result of uploadResults) {
            if (!result.error) {
                const url = `${path}/${result.name}`;
                projectImages.push({
                    image_url: url,
                    project_id: projectId as string,
                    display_order: displayOrder++,
                });
            }
        }

        return projectImagesRepository.createMany(projectImages);
    },

    removeImagesByProjectId: async function (projectId: string) {
        // when updating a project, delete the existing images first
        const deletedImages = await projectImagesRepository.removeManyByProjectId(projectId);

        // delete the project images
        if (deletedImages && deletedImages.length > 0) {
            await storageService.removeMany(deletedImages.map((image) => image.image_url));
        }

        return deletedImages;
    },
};
