import { Business, Project } from '@/lib/types/db';
import { projectRepository } from '../repositories/project.repository';
import { projectImagesService } from './project-images.service';
import { businessRepository } from '../repositories/business.repository';
import { StatusCodes } from 'http-status-codes';

export const projectService = {
    // get business by user id or create if not exists
    create: async function (userId: string, data: Partial<Project>, images: File[] = []) {
        // get the business
        const business = (await businessRepository.getByUserId(userId)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // create project
        const project = await projectRepository.create({ ...data, business_id: business.id });

        // create images
        const path = `${userId}/projects/${project.id}`;
        await projectImagesService.createManyImagesByProjectId(images, project.id, path);

        return project;
    },

    // get many projects
    getMany: async function (userId: string) {
        // get the business
        const business = (await businessRepository.getByUserId(userId)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // get the projects
        const projects = await projectRepository.getManyWithBusinessId(business.id);
        return projects;
    },

    // get many projects
    getManyByBusinessSlug: async function (slug: string) {
        // get the business
        const business = (await businessRepository.getBySlug(slug)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // get the projects
        const projects = await projectRepository.getManyWithBusinessId(business.id);
        return projects;
    },

    // update project by id
    updateById: async function (userId: string, id: string, data: Partial<Project>, images: File[] = []) {
        // update project
        const project = await projectRepository.updateById(id, data);

        // remove images
        await projectImagesService.removeImagesByProjectId(project.id);

        // create images
        const path = `${userId}/projects/${project.id}`;
        await projectImagesService.createManyImagesByProjectId(images, project.id, path);

        return project;
    },

    // delete project by id
    deleteById: async function (id: string) {
        // remove images
        await projectImagesService.removeImagesByProjectId(id);

        // delete project
        const project = await projectRepository.deleteById(id);

        return project;
    },
};
