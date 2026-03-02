import { createClient } from '../supabase/client';

export async function roleRedirect() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    if (data?.claims) {
        const role = data.claims.app_metadata?.role;
        switch (role) {
            case 'admin':
                return '/admin/overview';
            default:
                return '/dashboard/overview';
        }
    } else {
        return '/login';
    }
}
