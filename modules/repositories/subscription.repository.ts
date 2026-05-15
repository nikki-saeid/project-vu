import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { Subscription } from '@/lib/types/db';

export const subscriptionRepository = {
    user: {
        getByBusinessId: async function (businessId: string) {
            const supabase = await createClient();
            const { data, error } = await supabase.from('subscriptions').select().eq('business_id', businessId).maybeSingle();

            if (error) throw error;

            return data as Subscription | null;
        },
    },
    admin: {
        getByBusinessId: async function (businessId: string) {
            const adminSupabase = await createServiceRoleClient();
            const { data, error } = await adminSupabase.from('subscriptions').select().eq('business_id', businessId).maybeSingle();

            if (error) throw error;

            return data as Subscription | null;
        },
        create: async function (subscription: Partial<Subscription>) {
            const adminSupabase = await createServiceRoleClient();

            const { data, error } = await adminSupabase.from('subscriptions').insert(subscription).select().maybeSingle();

            if (error) throw error;

            return data;
        },
        updateByCustomerId: async function (customerId: string, subscription: Partial<Subscription>) {
            const adminSupabase = await createServiceRoleClient();

            const { data, error } = await adminSupabase
                .from('subscriptions')
                .update(subscription)
                .eq('stripe_customer_id', customerId)
                .select()
                .maybeSingle();

            if (error) throw error;

            return data;
        },

        updateByBusinessId: async function (businessId: string, subscription: Partial<Subscription>) {
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

        getAllActive: async function () {
            const adminSupabase = await createServiceRoleClient();
            const { data, error } = await adminSupabase.from('subscriptions').select().eq('status', 'active');

            if (error) throw error;

            return data;
        },
    },
};
