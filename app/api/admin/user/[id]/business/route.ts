import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

type Params = {
    params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Params) {
    try {
        const supabase = await createClient();

        // check if the project id is present
        const { id } = await params;
        if (!id?.trim()) {
            return errorHandler({
                error: new Error('Project ID is required'),
            });
        }

        // Get the user
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in'),
            });
        }

        // check of the user admin
        if (user?.role !== 'admin') {
            return errorHandler({
                error: new Error('You are not authorized to access this resource'),
            });
        }

        // admin access
        const adminClient = await createServiceRoleClient();
        // Fetch the profile
        const { data: business, error } = await adminClient.from('businesses').select('*').eq('user_id', id).maybeSingle();

        // Fetching error handling
        if (error) return errorHandler({ error });

        // Return response
        return new SuccessResponse<Business>('profile fetched successfully', business).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
