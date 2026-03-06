import { getUserAuth } from '@/lib/api-fetcher/user-auth';
import { getUserBusiness } from '@/lib/api-fetcher/user-business';
import { getUserProfile } from '@/lib/api-fetcher/user-profile';
import { UserProvider } from '@/lib/providers/user-provider';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default async function IsUserLayer({ children }: ChildrenProp) {
    const user = await getUserAuth();

    if (!user) {
        redirect('/login');
    } else if (user?.app_metadata?.role === 'admin') {
        redirect('/admin/overview');
    }

    const profile = await getUserProfile();
    const business = await getUserBusiness();

    return (
        <UserProvider initialProfile={profile} initialUser={user} initialBusiness={business}>
            {children}
        </UserProvider>
    );
}
