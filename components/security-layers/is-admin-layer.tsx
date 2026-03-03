import { createClient } from '@/lib/supabase/server';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';

export default async function IsAdminLayer({ children }: ChildrenProp) {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session?.user?.app_metadata?.role !== 'admin') {
        redirect('/');
    }

    return children;
}
