import { ErrorResponse, SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/types/db';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function GET() {
    try {
        // Initialize Supabase client for server-side operations
        const supabase = await createClient();

        // Get the session
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Fetch the profile
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id).maybeSingle();

        // Fetching error handling
        if (error) {
            const { message, status } = errorHandler({
                error,
                defaultValue: { status: StatusCodes.INTERNAL_SERVER_ERROR, message: ReasonPhrases.INTERNAL_SERVER_ERROR },
            });
            return new ErrorResponse(status, message).send();
        }

        // Return response
        return new SuccessResponse<Profile>('profile fetched successfully', data).send();
    } catch (error) {
        const { message, status } = errorHandler({
            error,
            defaultValue: { status: StatusCodes.INTERNAL_SERVER_ERROR, message: ReasonPhrases.INTERNAL_SERVER_ERROR },
        });
        return new ErrorResponse(status, message).send();
    }
}
