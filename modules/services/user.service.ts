import { createClient } from '@/lib/supabase/server';

type UpdateUserType = {
    avatar_url?: string;
    full_time?: string;
};

export const userService = {
    // get user
    getUser: async function () {
        const supabase = await createClient();

        // Get the user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        return user;
    },

    // update user
    updateUser: async function (data: UpdateUserType) {
        const supabase = await createClient();

        const {
            error: updateUserError,
            data: { user },
        } = await supabase.auth.updateUser({ data });

        // Update error handling
        if (updateUserError) throw updateUserError;
        // Return response
        return user;
    },
};
