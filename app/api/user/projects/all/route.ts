import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { getStoragePublicUrl } from '@/lib/helpers/image-public-url';
import { parsePostGisPoint } from '@/lib/helpers/postgis';
import { createClient } from '@/lib/supabase/server';
import type { ProjectWithImages } from '@/lib/types/api';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function GET() {
    try {
        // Initialize Supabase client for server-side operations
        const supabase = await createClient();

        // Get the session
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('Unauthorized'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: 'You must be signed in to get your profile' },
            });
        }

        // Fetch the profile
        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('*')
            .eq('user_id', user?.id)
            .maybeSingle();

        if (!business) {
            return errorHandler({
                error: new Error('Business not found'),
                defaultValue: { status: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND },
            });
        }

        // Fetching error handling
        if (businessError) return errorHandler({ error: businessError });

        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select(
                `
                id,
                created_at,
                title,
                description,
                address,
                location,
                business_id,
                project_image (
                    id,
                    created_at,
                    image_url,
                    project_id,
                    display_order
                )
            `,
            )
            .eq('business_id', business?.id)
            .order('created_at', { ascending: false });

        if (projectsError) return errorHandler({ error: projectsError });

        // Ensure every project has project_image array (ordered by display_order) and lng/lat from PostGIS

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const images = (project.project_image ?? []).sort(
                (a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order,
            );
            const coords = parsePostGisPoint(project.location as string | null);

            const publicUrls = await Promise.all(images.map(async (image) => await getStoragePublicUrl(image.image_url)));

            projects[i] = {
                ...project,
                project_image: images.map((image, index) => ({ ...image, image_url: publicUrls[index] })),
                ...(coords && { lng: coords.lng, lat: coords.lat }),
            };
        }

        return new SuccessResponse<ProjectWithImages[]>('profile fetched successfully', projects).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
