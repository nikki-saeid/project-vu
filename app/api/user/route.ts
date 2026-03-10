import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { User } from '@supabase/supabase-js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function PATCH(request: Request) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('You must be signed in to update your profile'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED },
            });
        }

        const body = await request.json();

        // update the user metadata
        const {
            error: insertProfileError,
            data: { user: updatedUser },
        } = await supabase.auth.updateUser({ data: { full_name: body.full_name } });

        // update error handling
        if (insertProfileError) return errorHandler({ error: insertProfileError });

        return new SuccessResponse<User | null>('Profile updated successfully', updatedUser).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
