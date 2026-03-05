import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';

export async function GET() {
    try {
        // Initialize Supabase client for server-side operations
        const supabase = await createClient();

        // Get the user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Fetch the profile
        const { data, error } = await supabase.from('businesses').select('*').eq('user_id', user?.id).maybeSingle();

        // Fetching error handling
        if (error) return errorHandler({ error });

        // create a profile for the user if profile is null
        if (!data) {
            const { error: insertError } = await supabase.from('businesses').insert({ user_id: user?.id });

            // insert error handing
            if (insertError) return errorHandler({ error: insertError });
        }

        // Return response
        return new SuccessResponse<Business>('profile fetched successfully', data).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
