import { createServiceRoleClient } from '@/lib/supabase/server';
import { Subscription } from '@/lib/types/db';

export const subscriptionRepository = {
    getByBusinessId: async function (businessId: string) {
        const adminSupabase = await createServiceRoleClient();
        const { data, error } = await adminSupabase.from('subscriptions').select().eq('business_id', businessId).maybeSingle();

        if (error) throw error;

        return data;
    },

    // create
    adminCreate: async function (subscription: Partial<Subscription>) {
        const adminSupabase = await createServiceRoleClient();
        const { data, error } = await adminSupabase.from('subscriptions').insert(subscription).select().maybeSingle();

        if (error) throw error;

        return data;
    },

    // create
    adminUpdateByBusinessId: async function (businessId: string, subscription: Partial<Subscription>) {
        const adminSupabase = await createServiceRoleClient();
        const { data, error } = await adminSupabase
            .from('subscriptions')
            .update(subscription)
            .eq('business_id', businessId)
            .select()
            .maybeSingle();

        if (error) throw error;

        return data;
    },
};
