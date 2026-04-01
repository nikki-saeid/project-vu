import { Business } from '@/lib/types/db';
import { adminRepository } from '../repositories/admin.repository';
import { businessService } from './business.service';
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
            const { images_urls } = projects[i];
            await storageService.removeMany(images_urls ?? []);
        }

        // remove user
        return await adminRepository.deleteUserById(userId);
    },

    updateBusinessByUserId: async function (userId: string, data: Partial<Business>) {
        return await adminRepository.updateBusinessByUserId(userId, data);
    },

    updateBusinessById: async function (id: string, data: Partial<Business>) {
        return await adminRepository.updateBusinessById(id, data);
    },
};
