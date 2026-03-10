import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function GET() {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        if (user.app_metadata?.role !== 'admin') {
            return errorHandler({
                error: new Error('You are not authorized to access this resource'),
                defaultValue: { status: StatusCodes.FORBIDDEN, message: ReasonPhrases.FORBIDDEN },
            });
        }

        const adminClient = createServiceRoleClient();
        const { data, error } = await adminClient.auth.admin.listUsers();

        if (error) return errorHandler({ error });

        return new SuccessResponse('Users fetched successfully', data).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
