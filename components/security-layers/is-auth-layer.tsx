import { getUserAuth } from '@/lib/api-fetcher/user-auth';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default async function IsAuthLayer({ children }: ChildrenProp) {
    const user = await getUserAuth();

    if (user) {
        if (user.app_metadata?.role === 'admin') {
            redirect('/admin/overview');
        } else {
            redirect('/dashboard/live-page');
        }
    }
    return children;
}
