import { createClient } from '../supabase/server';

export const getUserAuth = async () => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
};
