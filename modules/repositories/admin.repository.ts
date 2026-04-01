import { createServiceRoleClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';

export const adminRepository = {
    // get by user id
    deleteUserById: async function (userId: string) {
        const adminClient = await createServiceRoleClient();
        const { error } = await adminClient.auth.admin.deleteUser(userId);

        if (error) throw error;

        return;
    },

    // update user by id
    updateBusinessByUserId: async function (userId: string, data: Partial<Business>) {
        const adminClient = await createServiceRoleClient();
        const { error, data: updatedData } = await adminClient.from('businesses').update(data).eq('user_id', userId).select().maybeSingle();

        if (error) throw error;

        return updatedData;
    },

    updateBusinessById: async function (id: string, data: Partial<Business>) {
        const adminClient = await createServiceRoleClient();
        const { error, data: updatedData } = await adminClient.from('businesses').update(data).eq('id', id).select().maybeSingle();

        if (error) throw error;

        return updatedData;
    },
};
