import { Business, Project } from '@/lib/types/db';
import { projectRepository } from '../repositories/project.repository';
import { businessRepository } from '../repositories/business.repository';
import { StatusCodes } from 'http-status-codes';
import { storageService } from './storage.service';
import { randomUUID } from 'crypto';

export const projectService = {
    // get business by user id or create if not exists
    create: async function (userId: string, data: Partial<Project>, images: File[] = []) {
        // get the business
        const business = (await businessRepository.getByUserId(userId)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        const id = randomUUID();

        // store images
        const path = `${userId}/projects/${id}`;
        const projectImages = await storageService.uploadMany(images, path);

        // create project
        return await projectRepository.create({ ...data, id, business_id: business.id, images_urls: projectImages });
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
    updateById: async function (userId: string, id: string, data: Partial<Project>, images: File[] = []) {
        // get the project
        const project = await projectRepository.getById(id);
        if (!project) {
            throw { error: new Error('Project not found'), status: StatusCodes.NOT_FOUND };
        }

        // remove images
        await storageService.removeMany(project.images_urls);

        // store images
        const path = `${userId}/projects/${id}`;
        const projectImages = await storageService.uploadMany(images, path);

        // update project
        return (await projectRepository.updateById(id, { ...data, images_urls: projectImages })) as Project;
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
