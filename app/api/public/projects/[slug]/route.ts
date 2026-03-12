import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { getStoragePublicUrls } from '@/lib/helpers/image-public-url';
import { createClient } from '@/lib/supabase/server';
import type { ProjectWithImages } from '@/lib/types/api';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';

type PublicProjectsRouteParams = {
    params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: PublicProjectsRouteParams) {
    try {
        const { slug } = await params;
        const searchParams = request.nextUrl.searchParams;
        const user_view = searchParams.get('user_view');
        const isUserView = user_view === 'true';

        // check if the slug is present
        if (!slug?.trim()) {
            return errorHandler({
                error: new Error('Slug is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }
        if (!slug?.trim()) {
            return errorHandler({
                error: new Error('Slug is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        const supabase = await createClient();
        let business: { id: string } | null = null;
        // --------------------------------------------------------- if user view ---------------------------------------------------------
        if (isUserView) {
            // Get the user
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) {
                return errorHandler({
                    error: new Error('Unauthorized'),
                    defaultValue: { status: StatusCodes.UNAUTHORIZED, message: 'You must be signed in to view this projects' },
                });
            }

            // Get the business
            const { data: _business, error: businessError } = await supabase
                .from('businesses')
                .select('id')
                .eq('user_id', user.id)
                .maybeSingle();
            if (businessError) return errorHandler({ error: businessError });
            if (!_business) {
                return errorHandler({
                    error: new Error('Business not found'),
                    defaultValue: { status: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND },
                });
            }
            business = _business;
        }
        // --------------------------------------------------------- if user view ---------------------------------------------------------
        else {
            // Fetch the profile
            const { data: _business, error: businessError } = await supabase
                .from('businesses')
                .select('id')
                .eq('slug', slug.trim())
                .eq('page_status', 'live')
                .maybeSingle();

            if (!_business) {
                return errorHandler({
                    error: new Error('Business not found'),
                    defaultValue: { status: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND },
                });
            }

            // Fetching error handling
            if (businessError) return errorHandler({ error: businessError });
            business = _business;
        }

        // --------------------------------------------------------- get projects ---------------------------------------------------------
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
        const projectsWithImages = await getStoragePublicUrls(projects);

        return new SuccessResponse<ProjectWithImages[]>('profile fetched successfully', projectsWithImages).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
