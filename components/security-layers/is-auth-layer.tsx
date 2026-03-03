import { createClient } from '@/lib/supabase/server';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';

export default async function IsAuthLayer({ children }: ChildrenProp) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (!error && data?.claims) {
        if (data.claims.app_metadata?.role === 'admin') {
            redirect('/admin/overview');
        } else {
            redirect('/dashboard/overview');
        }
    }
    return children;
}
