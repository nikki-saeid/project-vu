import { createClient } from '@/lib/supabase/server';
import { Review } from '@/lib/types/db';

export const reviewRepository = {
    // create
    create: async function (review: Partial<Review>) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('reviews').insert(review).select().maybeSingle();

        if (error) throw error;

        return data as Review;
    },

    getByEmailAndBusinessId: async function (email: string, businessId: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('reviews').select().eq('email', email).eq('business_id', businessId).maybeSingle();

        if (error) throw error;

        return data as Review;
    },

    getManyByBusinessId: async function (businessId: string) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('reviews')
            .select()
            .eq('business_id', businessId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data as Review[];
    },

    getById: async function (id: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('reviews').select().eq('id', id).maybeSingle();

        if (error) throw error;

        return data as Review;
    },
    updateById: async function (id: string, review: Partial<Review>) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('reviews').update(review).eq('id', id).select().maybeSingle();

        if (error) throw error;

        return data as Review;
    },

    // delete project by id
    deleteById: async function (id: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('reviews').delete().eq('id', id).select().maybeSingle();

        if (error) throw error;

        return data;
    },
};
