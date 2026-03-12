import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Project } from '@/lib/types/db';
import { projectCreateSchema } from '@/lib/validators/user/project';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const BUCKET_NAME = 'businesses';

type Params = {
    params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Params) {
    try {
        const supabase = await createClient();

        // check if the project id is present
        const { id } = await params;
        if (!id?.trim()) {
            return errorHandler({
                error: new Error('Project ID is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        // check if the user is signed in
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in to update a project'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        // check if the user has a business
        const { data: business } = await supabase.from('businesses').select('id').eq('user_id', user.id).maybeSingle();
        if (!business?.id) {
            return errorHandler({
                error: new Error('You need a business to update a project'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        // check if the body is present
        const body = await request.json();
        const parsed = projectCreateSchema.safeParse(body);
        if (!parsed.success) {
            const first = parsed.error.flatten().fieldErrors;
            const message = Object.values(first).flat().join(' ') || 'Validation failed';
            return errorHandler({
                error: new Error(message),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message },
            });
        }

        // parse the body
        const { title, description, address, latitude, longitude } = parsed.data;
        const location = `POINT(${longitude} ${latitude})`;

        // update the project
        const { data, error } = await supabase
            .from('projects')
            .update({
                title,
                description,
                address,
                location,
            })
            .eq('id', id)
            .eq('business_id', business.id)
            .select()
            .maybeSingle();

        if (error) return errorHandler({ error });

        return new SuccessResponse<Project>('Project updated successfully', data as unknown as Project).send();
    } catch (error) {
        return errorHandler({ error });
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const supabase = await createClient();

        // check if the project id is present
        const { id } = await params;
        if (!id?.trim()) {
            return errorHandler({
                error: new Error('Project ID is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        // check if the user is signed in
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in to update a project'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        // check if the user has a business
        const { data: business } = await supabase.from('businesses').select('id').eq('user_id', user.id).maybeSingle();
        if (!business?.id) {
            return errorHandler({
                error: new Error('You need a business to delete a project'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        // check if the project has images
        const { data: projectImages, error: projectImagesError } = await supabase
            .from('project_image')
            .select('image_url')
            .eq('project_id', id);
        if (projectImagesError) return errorHandler({ error: projectImagesError });

        // delete the project images
        if (projectImages && projectImages.length > 0) {
            const { error: deleteError } = await supabase.storage.from(BUCKET_NAME).remove(projectImages.map((image) => image.image_url));
            if (deleteError) return errorHandler({ error: deleteError });
        }

        // // delete the project
        const { error } = await supabase.from('projects').delete().eq('id', id).eq('business_id', business.id);
        if (error) return errorHandler({ error });

        // return the success response
        return new SuccessResponse('Project deleted successfully', null).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
