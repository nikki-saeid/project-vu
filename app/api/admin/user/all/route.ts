import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();

        // check if user is authenticated
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        // check if user is admin
        if (user.app_metadata?.role !== 'admin') {
            return errorHandler({
                error: new Error('You are not authorized to access this resource'),
                defaultValue: { status: StatusCodes.FORBIDDEN, message: ReasonPhrases.FORBIDDEN },
            });
        }

        // get page number
        const { searchParams } = req.nextUrl;
        const page = searchParams.get('page');

        // fetch users
        const adminClient = createServiceRoleClient();
        const { data, error } = await adminClient.auth.admin.listUsers({
            page: page ? Number(page) : 1,
            perPage: 10,
        });

        // handle error
        if (error) return errorHandler({ error });

        // return response
        return new SuccessResponse('Users fetched successfully', {
            ...data,
        }).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
