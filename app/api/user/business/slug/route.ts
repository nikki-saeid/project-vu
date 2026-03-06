import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { StatusCodes } from 'http-status-codes';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug')?.trim();

        if (!slug) {
            return errorHandler({
                error: new Error('Slug is required'),
                defaultValue: { status: StatusCodes.BAD_REQUEST, message: 'Slug query parameter is required' },
            });
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('businesses')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (error) return errorHandler({ error });

        return new SuccessResponse<{ exists: boolean }>('Slug check completed', {
            exists: data !== null,
        }).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
