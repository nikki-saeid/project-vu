import { SuccessResponse } from '@/lib/helpers/api-response';
import { errorHandler } from '@/lib/helpers/error-handler';
import { generateUniqueSlug } from '@/lib/helpers/unique-slug';
import { createClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';
import { StatusCodes } from 'http-status-codes';

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

export async function PUT(request: Request) {
    try {
        // Initialize Supabase client for server-side operations
        const supabase = await createClient();

        // Get the user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return errorHandler({
                error: new Error('Unauthorized'),
                defaultValue: { status: StatusCodes.UNAUTHORIZED, message: 'You must be signed in to update your business' },
            });
        }

        // Get the body
        const body = await request.json();

        // Generate a unique slug if name is present in the request body
        body.slug = generateUniqueSlug(body.name);

        // Update the business
        const { data, error } = await supabase.from('businesses').update(body).eq('user_id', user?.id).maybeSingle();

        // Fetching error handling
        if (error) return errorHandler({ error });

        // Update the user metadata (sets avatar_url directly in top-level user_metadata, per Supabase API)
        const { error: updateUserError } = await supabase.auth.updateUser({
            data: {
                user_metadata: {
                    ...user.user_metadata,
                    avatar_url: body.logo_url,
                    name: body.name,
                },
            },
        });

        // Update error handling
        if (updateUserError) return errorHandler({ error: updateUserError });
        // Return response
        return new SuccessResponse<Business>('business updated successfully', data as unknown as Business).send();
    } catch (error) {
        return errorHandler({ error });
    }
}
