import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';
import type { PageStatusEnum } from '@/lib/types/db';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const VALID_STATUSES: PageStatusEnum[] = ['draft', 'live'];

export async function PUT(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in to update page status'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        const body = await request.json();
        const status = body?.status as PageStatusEnum | undefined;

        if (!status || !VALID_STATUSES.includes(status)) {
            return errorHandler({
                error: new Error('Invalid status. Must be "live" or "draft"'),
                defaultValue: {
                    status: StatusCodes.BAD_REQUEST,
                    message: ReasonPhrases.BAD_REQUEST,
                },
            });
        }

        const { data, error } = await supabase
            .from('businesses')
            .update({ page_status: status })
            .eq('user_id', user.id)
            .select()
            .maybeSingle();

        if (error) return errorHandler({ error });

        return new SuccessResponse<Business>('Page status updated successfully', data as unknown as Business).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
