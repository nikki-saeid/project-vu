import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { parsePostGisPoint } from '@/lib/helpers/postgis';
import { createClient } from '@/lib/supabase/server';
import type { ProjectWithImages } from '@/lib/types/api';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

type Params = {
    params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
    try {
        const { slug } = await params;

        if (!slug?.trim()) {
            return errorHandler({
                error: new Error('Slug is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        const supabase = await createClient();

        // Fetch the profile
        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('id')
            .eq('slug', slug.trim())
            .eq('page_status', 'live')
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
        const projectsWithImages: ProjectWithImages[] = (projects ?? []).map((p) => {
            const images = (p.project_image ?? []).sort(
                (a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order,
            );
            const coords = parsePostGisPoint(p.location as string | null);
            return {
                ...p,
                project_image: images,
                ...(coords && { lng: coords.lng, lat: coords.lat }),
            } as ProjectWithImages;
        });

        return new SuccessResponse<ProjectWithImages[]>('profile fetched successfully', projectsWithImages).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
