import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
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
            });
        }

        console.log('user', user);

        // check if user is admin
        if (user?.role !== 'admin') {
            return errorHandler({
                error: new Error('You are not authorized to access this resource'),
            });
        }

        // get page number
        const { searchParams } = req.nextUrl;
        const page = searchParams.get('page');

        // fetch users
        const adminClient = await createServiceRoleClient();
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
