import { createClient } from '@/lib/supabase/server';
import { emailService } from './email.service';

type UpdateUserType = {
    avatar_url?: string;
    full_name?: string;
};

export const userService = {
    // get user
    get: async function () {
        const supabase = await createClient();

        // Get the user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        return user;
    },

    // update user
    update: async function (data: UpdateUserType) {
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

    email: {
        welcome: async function ({ full_name, email }: { full_name: string; email: string }) {
            return await emailService.sendWelcomeEmail(email, full_name);
        },
        trialEndSoonReminder: async function ({ name, email }: { name: string; email: string }) {
            return await emailService.sendTrialEndSoonReminder(email, name);
        },
    },
};
