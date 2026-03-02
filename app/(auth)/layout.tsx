import { createClient } from '@/lib/supabase/server';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';

export default async function layout({ children }: ChildrenProp) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (!error && data?.claims) {
        if (data.claims.app_metadata?.role === 'admin') {
            redirect('/admin/overview');
        } else {
            redirect('/dashboard/overview');
        }
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">{children}</div>
        </div>
    );
}
