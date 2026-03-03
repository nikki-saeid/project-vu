import { createClient } from '@/lib/supabase/server';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';

export default async function IsAdminLayer({ children }: ChildrenProp) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user?.app_metadata?.role !== 'admin') {
        redirect('/');
    }

    return children;
}
