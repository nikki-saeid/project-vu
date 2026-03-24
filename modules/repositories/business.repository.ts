import { createClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types/db';

export const businessRepository = {
    // get by user id
    getByUserId: async function (userId: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('businesses').select('*').eq('user_id', userId).maybeSingle();

        if (error) throw error;

        return data;
    },

    // get by slug
    getBySlug: async function (slug: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('businesses').select('*').eq('slug', slug).maybeSingle();

        if (error) throw error;

        return data;
    },

    // create
    create: async function (business: Partial<Business>) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('businesses').insert(business).select().maybeSingle();

        if (error) throw error;

        return data;
    },

    // create
    update: async function (business: Partial<Business>) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('businesses').update(business).eq('user_id', business.user_id).select().maybeSingle();

        if (error) throw error;

        return data;
    },
};
