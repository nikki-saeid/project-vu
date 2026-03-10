import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import type { ProjectImageResponse } from '@/lib/types/api';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const BUCKET_NAME = 'businesses';
const CACHE_CONTROL = '0';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in to upload a project images'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        const formData = await request.formData();
        const files = formData.getAll('files');
        const projectId = formData.get('projectId');

        if (!files || files.length === 0) {
            return errorHandler({
                error: new Error('Missing files'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        if (!projectId) {
            return errorHandler({
                error: new Error('Project ID is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        const path = `${user.id}/projects/${projectId}`;

        // Save each image in the formData 'files' array to Supabase storage, one-by-one:
        const uploadResults = await Promise.all(
            files.map(async (file) => {
                if (!(file instanceof File)) {
                    return { name: (file as unknown as File)?.name ?? 'unknown', error: new Error('Not a valid file') };
                }
                // The storage path should separate files (keep distinct names)
                const filePath = `${path}/${file.name}`;
                const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
                    cacheControl: CACHE_CONTROL,
                    upsert: true,
                });
                return { name: file.name, error };
            }),
        );

        // Collect the first error if any
        const uploadError = uploadResults.find((r) => r.error)?.error;

        if (uploadError) return errorHandler({ error: uploadError });

        // Store the uploadResults public urls to project_image

        const projectImages: ProjectImageResponse[] = [];
        let displayOrder = 0;
        for (const result of uploadResults) {
            if (!result.error) {
                const url = supabase.storage.from(BUCKET_NAME).getPublicUrl(`${path}/${result.name}`).data.publicUrl;
                const { error: insertError } = await supabase.from('project_image').insert({
                    image_url: url,
                    project_id: projectId as string,
                    display_order: displayOrder++,
                });
                if (insertError) return errorHandler({ error: insertError });
                projectImages.push({
                    image_url: url,
                    project_id: projectId as string,
                    display_order: displayOrder,
                });
            }
        }

        return new SuccessResponse<ProjectImageResponse[]>('Project images saved successfully', projectImages).send();
    } catch (error) {
        throw errorHandler({ error });
    }
}
