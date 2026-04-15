import { createClient } from '../supabase/client';

export async function roleRedirect() {
    const supabase = createClient();
    const { data } = await supabase.auth.getClaims();

    if (data?.claims) {
        const role = data.claims.role;
        switch (role) {
            case 'admin':
                return '/admin/overview';
            default:
                return '/dashboard/live-page';
        }
    } else {
        return '/login';
    }
}
