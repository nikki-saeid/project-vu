import { getUserAuth } from '@/lib/api-fetcher/user-auth';
import { getUserProfile } from '@/lib/api-fetcher/user-profile';
import { UserProvider } from '@/lib/providers/user-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function UserProviderInner({ children }: ChildrenProp) {
    const profile = await getUserProfile();
    const user = await getUserAuth();

    return (
        <UserProvider initialProfile={profile} initialUser={user} >
            {children}
        </UserProvider>
    );
}
