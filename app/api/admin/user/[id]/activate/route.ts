import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

type Params = {
    params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: Params) {
    try {
        const supabase = await createClient();

        // check if the project id is present
        const { id } = await params;
        if (!id?.trim()) {
            return errorHandler({
                error: new Error('Project ID is required'),
            });
        }

        // is_active is required
        const body = await request.json();
        const { activate } = body || {};

        if (activate === undefined) {
            return errorHandler({
                error: new Error('(activate) is required'),
            });
        }

        // check of the user exist
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in'),
            });
        }

        // check of the user admin
        if (user.app_metadata?.role !== 'admin') {
            return errorHandler({
                error: new Error('You are not authorized to access this resource'),
            });
        }

        // admin update the user
        const adminClient = await createServiceRoleClient();
        const { error, data } = await adminClient.auth.admin.updateUserById(id, {
            ban_duration: activate ? 'none' : '876600h',
        });

        if (error) return errorHandler({ error });

        return new SuccessResponse('Users fetched successfully', null).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
