import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';

type PublicBusinessRouteParams = {
    params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: PublicBusinessRouteParams) {
    try {
        const { slug } = await params;
        console.log('----------------------------------- slug ', slug);
        const searchParams = request.nextUrl.searchParams;
        const user_view = searchParams.get('user_view');
        const isUserView = user_view === 'true';


        if (!slug?.trim()) {
            return errorHandler({
                error: new Error('Slug is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: ReasonPhrases.BAD_REQUEST },
            });
        }

        const supabase = await createClient();

        if (isUserView) {
            // Get the user
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                return errorHandler({
                    error: new Error('Unauthorized'),
                    defaultValue: { status: StatusCodes.UNAUTHORIZED, message: 'You must be signed in to view this business' },
                });
            }

            // Get the business
            const { data, error } = await supabase
                .from('businesses')
                .select('name, logo_url, type, description, facebook_url, instagram_url, x_url, website_url, phone, email')
                .eq('slug', slug.trim())
                .maybeSingle();
            if (error) return errorHandler({ error });

            if (!data) {
                return errorHandler({
                    error: new Error('Business not found'),
                    defaultValue: { status: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND },
                });
            }
            return new SuccessResponse<Business>('Business fetched successfully', data as Business).send();
        }

        // Get the business for public view
        const { data, error } = await supabase
            .from('businesses')
            .select('name, logo_url, type, description, facebook_url, instagram_url, x_url, website_url, phone, email')
            .eq('slug', slug.trim())
            .eq('page_status', 'live')
            .maybeSingle();
        if (error) return errorHandler({ error });
        if (!data) {
            return errorHandler({
                error: new Error('Business not found'),
                defaultValue: { status: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND },
            });
        }

        return new SuccessResponse<Business>('Business fetched successfully', data as Business).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
