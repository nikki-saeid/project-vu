import { getUserAuth } from '@/lib/api-fetcher/user/user-auth';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default async function IsUserLayer({ children }: ChildrenProp) {
    const user = await getUserAuth();

    if (!user) {
        redirect('/login');
    } else if (user?.app_metadata?.role === 'admin') {
        redirect('/admin/overview');
    }

    return children;
}
