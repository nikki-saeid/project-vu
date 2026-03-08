import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Project } from '@/lib/types/db';
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

        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('id')
            .eq('slug', slug.trim())
            .eq('page_status', 'live')
            .maybeSingle();

        if (businessError) return errorHandler({ error: businessError });

        if (!business) {
            return errorHandler({
                error: new Error('Business not found'),
                defaultValue: { status: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND },
            });
        }

        const { data, error } = await supabase
            .from('projects')
            .select('title, description, address, location')
            .eq('business_id', business.id)
            .order('created_at', { ascending: false });

        if (error) return errorHandler({ error });

        return new SuccessResponse<Project[]>('Projects fetched successfully', data as Project[]).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
