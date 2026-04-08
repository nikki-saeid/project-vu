import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapperPrivate, tryCatchWrapperPublic } from '@/lib/helpers/global-try-catch';
import { ControllerPropsPrivate, ControllerPropsPublic, ParamsId, ParamsSlug, ProjectWithLatLng } from '@/lib/types/api';
import { Project } from '@/lib/types/db';
import { projectService } from '../services/project.service';

export const projectController = {
    getById: tryCatchWrapperPrivate(async function ({ contextParams }: ControllerPropsPrivate<ParamsId>) {
        // Get the project id
        if (!contextParams) throw new Error('Id is required');
        const params = await contextParams.params;
        const { id } = params;

        const project = await projectService.getById(id);
        return new SuccessResponse<ProjectWithLatLng>('Project fetched successfully', project).send();
    }),
    getPublicById: tryCatchWrapperPublic(async function ({ contextParams }: ControllerPropsPublic<ParamsId>) {
        // Get the project id
        if (!contextParams) throw new Error('Id is required');
        const params = await contextParams.params;
        const { id } = params;

        const project = await projectService.getById(id);
        return new SuccessResponse<ProjectWithLatLng>('Project fetched successfully', project).send();
    }),
    // get by user id
    create: tryCatchWrapperPrivate(async ({ req, user }: ControllerPropsPrivate) => {
        // Get the body
        const formData = await req.formData();
        const images = formData.getAll('images');
        const body = JSON.parse(formData.get('body') as string);

        // parse the body
        const { title, description, address, latitude, longitude } = body;
        const location = `POINT(${longitude} ${latitude})`;

        // Create the project
        const project = await projectService.create(user.id, { title, description, address, location }, images as File[]);
        return new SuccessResponse<Project>('Project added successfully', project).send();
    }),

    //  get many projects with pagination
    getMany: tryCatchWrapperPrivate(async function ({ user }: ControllerPropsPrivate) {
        const projects = await projectService.getMany(user.id);
        return new SuccessResponse<ProjectWithLatLng[]>('Projects fetched successfully', projects).send();
    }),

    //  get many projects with pagination
    getManyByBusinessSlug: tryCatchWrapperPublic(async function ({ contextParams }: ControllerPropsPublic<ParamsSlug>) {
        // Get the business slug
        if (!contextParams) throw new Error('Slug is required');
        const params = await contextParams.params;
        const { slug } = params;

        const projects = await projectService.getManyByBusinessSlug(slug);
        return new SuccessResponse<ProjectWithLatLng[]>('Projects fetched successfully', projects).send();
    }),

    // update
    updateById: tryCatchWrapperPrivate(async function ({ req, user, contextParams }: ControllerPropsPrivate<ParamsId>) {
        // Get the project id
        if (!contextParams) throw new Error('Id is required');
        const params = await contextParams.params;
        const { id } = params;

        // Get the body
        const formData = await req.formData();
        const images = formData.getAll('images');
        const body = JSON.parse(formData.get('body') as string);

        // parse the body
        const { title, description, address, latitude, longitude } = body;
        const location = `POINT(${longitude} ${latitude})`;

        // update the project
        const project = await projectService.updateById(user.id, id, { title, description, address, location }, images as File[]);

        return new SuccessResponse<Project>('Project updated successfully', project).send();
    }),

    // delete
    deleteById: tryCatchWrapperPrivate(async function ({ contextParams }: ControllerPropsPrivate<ParamsId>) {
        // Get the project id
        if (!contextParams) throw new Error('Id is required');
        const params = await contextParams.params;
        const { id } = params;

        const project = await projectService.deleteById(id);

        return new SuccessResponse<Project>('Project deleted successfully', project).send();
    }),
};
