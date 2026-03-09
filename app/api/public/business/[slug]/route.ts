import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';
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
