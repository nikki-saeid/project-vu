import { createServiceRoleClient } from '@/lib/supabase/server';

export const adminRepository = {
    // get by user id
    deleteUserById: async function (userId: string) {
        const adminClient = createServiceRoleClient();
        const { error } = await adminClient.auth.admin.deleteUser(userId);

        if (error) throw error;

        return;
    },
};
