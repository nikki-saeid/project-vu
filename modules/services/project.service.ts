import { Business, Project } from '@/lib/types/db';
import { StatusCodes } from 'http-status-codes';
import { subscriptionMiddleware } from '../middlewares/subscription.middleware';
import { businessRepository } from '../repositories/business.repository';
import { projectRepository } from '../repositories/project.repository';
import { storageService } from './storage.service';

export const projectService = {
    // get business by user id or create if not exists
    create: async function (userId: string, data: Partial<Project>) {
        return subscriptionMiddleware.projectsMax(async function () {
            // get the business
            const business = (await businessRepository.getByUserId(userId)) as Business;
            if (!business) {
                throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
            }

            // create project
            return await projectRepository.create({ ...data, business_id: business.id });
        }, userId);
    },

    getById: async function (id: string) {
        return storageService.getProjectStoragePublicUrls(await projectRepository.getById(id));
    },

    // get many projects
    getMany: async function (userId: string) {
        // get the business
        const business = (await businessRepository.getByUserId(userId)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // get the projects
        return await projectRepository.getManyWithBusinessId(business.id);
    },

    // get many projects
    getManyByBusinessSlug: async function (slug: string) {
        // get the business
        const business = (await businessRepository.getBySlug(slug)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // get the projects
        return await projectRepository.getManyWithBusinessId(business.id);
    },

    // update project by id
    updateById: async function (id: string, data: Partial<Project>) {
        // update project
        return (await projectRepository.updateById(id, data)) as Project;
    },

    // delete project by id
    deleteById: async function (id: string) {
        // delete project
        const project = await projectRepository.deleteById(id);

        // remove images
        await storageService.removeMany(project.images_urls);

        return project;
    },
};
