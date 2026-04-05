import { createServiceRoleClient } from '@/lib/supabase/server';

export const adminRepository = {
    user: {
        deleteById: async function (userId: string) {
            const adminClient = await createServiceRoleClient();
            const { error } = await adminClient.auth.admin.deleteUser(userId);

            if (error) throw error;

            return;
        },

        getMany: async function (page: number) {
            const adminClient = await createServiceRoleClient();
            const { data, error } = await adminClient.auth.admin.listUsers({
                page,
                perPage: 20,
            });

            if (error) throw error;

            return data;
        },

        activateById: async function (userId: string) {
            const adminClient = await createServiceRoleClient();
            const { data, error } = await adminClient.auth.admin.updateUserById(userId, { ban_duration: 'none' });

            if (error) throw error;

            return data.user;
        },
        banById: async function (userId: string) {
            const adminClient = await createServiceRoleClient();
            const { data, error } = await adminClient.auth.admin.updateUserById(userId, { ban_duration: '876600h' });

            if (error) throw error;

            return data.user;
        },
    },

    // business: {
    //     updateById: async function (id: string, data: Partial<Business>) {
    //         const adminClient = await createServiceRoleClient();
    //         const { error, data: updatedData } = await adminClient.from('businesses').update(data).eq('id', id).select().maybeSingle();

    //         if (error) throw error;

    //         return updatedData;
    //     },

    //     updateByUserId: async function (userId: string, data: Partial<Business>) {
    //         const adminClient = await createServiceRoleClient();
    //         const { error, data: updatedData } = await adminClient
    //             .from('businesses')
    //             .update(data)
    //             .eq('user_id', userId)
    //             .select()
    //             .maybeSingle();

    //         if (error) throw error;

    //         return updatedData;
    //     },
    // },
};
