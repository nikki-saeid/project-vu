import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { ParamsId, ParamsSlug, ProjectWithLatLng } from '@/lib/types/api';
import { Project } from '@/lib/types/db';
import { User } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { projectService } from '../services/project.service';

export const projectController = {
    // get by user id
    create: tryCatchWrapper(async (req: NextRequest, user: User) => {
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
    getMany: tryCatchWrapper(async function (_, user: User) {
        const projects = await projectService.getMany(user.id);
        return new SuccessResponse<ProjectWithLatLng[]>('Projects fetched successfully', projects).send();
    }),

    //  get many projects with pagination
    getManyByBusinessSlug: tryCatchWrapper(async function (_, user: User, { params }: ParamsSlug) {
        // Get the business slug
        const { slug } = await params;

        const projects = await projectService.getManyByBusinessSlug(slug);
        return new SuccessResponse<ProjectWithLatLng[]>('Projects fetched successfully', projects).send();
    }),

    // update
    update: tryCatchWrapper(async function (req: NextRequest, user: User, { params }: ParamsId) {
        // Get the project id
        const { id } = await params;

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
    delete: tryCatchWrapper(async function (req: NextRequest, user: User, { params }: ParamsId) {
        // Get the project id
        const { id } = await params;

        const project = await projectService.deleteById(id);

        return new SuccessResponse<[]>('Project deleted successfully', project).send();
    }),
};
