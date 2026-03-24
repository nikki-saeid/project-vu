import { adminRepository } from '../repositories/admin.repository';
import { businessService } from './business.service';
import { projectImagesService } from './project-images.service';
import { projectService } from './project.service';
import { storageService } from './storage.service';

export const adminService = {
    // get user
    deleteUserById: async function (userId: string) {
        // get business to remove logo
        const business = await businessService.getByUserId(userId);
        storageService.removeMany([business.logo_url]);

        // get projects to delete images
        const projects = await projectService.getMany(userId);
        for (let i = 0; i < projects.length; i++) {
            const { id } = projects[i];
            await projectImagesService.removeImagesByProjectId(id);
        }

        // remove user
        return await adminRepository.deleteUserById(userId);
    },
};
