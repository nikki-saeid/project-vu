import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/lib/types/db';

export async function GET() {
    try {
        // Initialize Supabase client for server-side operations
        const supabase = await createClient();

        // Get the session
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Fetch the profile
        const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user?.id).maybeSingle();

        // Fetching error handling
        if (error) return errorHandler({ error });

        // create a profile for the user if profile is null
        if (!data) {
            const { error: insertBusinessError } = await supabase
                .from('businesses')
                .insert({ user_id: user?.id, email: user?.email })
                .select()
                .maybeSingle();

            if (insertBusinessError) return errorHandler({ error: insertBusinessError });

            // create the profile
            const { error: insertProfileError } = await supabase
                .from('profiles')
                .insert({ full_name: user?.user_metadata?.full_name, user_id: user?.id });

            // insert error handing
            if (insertProfileError) return errorHandler({ error: insertProfileError });
        }

        // Return response
        return new SuccessResponse<Profile>('profile fetched successfully', data).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
