import { createClient } from '@/lib/supabase/server';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';

export default async function layout({ children }: ChildrenProp) {
    // const supabase = await createClient();
    // const { data } = await supabase.auth.getClaims();

    // if (data?.claims) {
    //     redirect('/protected');
    // }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">{children}</div>
        </div>
    );
}
