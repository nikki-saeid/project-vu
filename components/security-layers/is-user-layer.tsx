import { createClient } from '@/lib/supabase/server';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';

export default async function IsUserLayer({ children }: ChildrenProp) {
    const supabase = await createClient();

    const { data } = await supabase.auth.getClaims();
    if (data?.claims.app_metadata?.role === 'admin') {
        redirect('/admin/overview');
    }

    return children;
}
