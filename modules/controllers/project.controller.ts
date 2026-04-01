import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { ControllerProps, ParamsId, ParamsSlug, ProjectWithLatLng } from '@/lib/types/api';
import { Project } from '@/lib/types/db';
import { projectService } from '../services/project.service';

export const projectController = {
    // get by user id
    create: tryCatchWrapper(async ({ req, user }: ControllerProps) => {
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
    getMany: tryCatchWrapper(async function ({ user }: ControllerProps) {
        const projects = await projectService.getMany(user.id);
        return new SuccessResponse<ProjectWithLatLng[]>('Projects fetched successfully', projects).send();
    }),

    //  get many projects with pagination
    getManyByBusinessSlug: tryCatchWrapper(async function ({ context }: ControllerProps<ParamsSlug>) {
        // Get the business slug
        if (!context) throw new Error('Slug is required');
        const params = await context.params;
        const { slug } = params;

        const projects = await projectService.getManyByBusinessSlug(slug);
        return new SuccessResponse<ProjectWithLatLng[]>('Projects fetched successfully', projects).send();
    }),

    // update
    update: tryCatchWrapper(async function ({ req, user, context }: ControllerProps<ParamsId>) {
        // Get the project id
        if (!context) throw new Error('Id is required');
        const params = await context.params;
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
    delete: tryCatchWrapper(async function ({ context }: ControllerProps<ParamsId>) {
        // Get the project id
        if (!context) throw new Error('Id is required');
        const params = await context.params;
        const { id } = params;

        const project = await projectService.deleteById(id);

        return new SuccessResponse<[]>('Project deleted successfully', project).send();
    }),
};
