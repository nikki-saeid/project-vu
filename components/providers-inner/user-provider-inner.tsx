import { getUserAuth } from '@/lib/api-fetcher/user/server/auth';
import { UserProvider } from '@/lib/providers/user-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function UserProviderInner({ children }: ChildrenProp) {
    const user = await getUserAuth();

    return <UserProvider initialUser={user}>{children}</UserProvider>;
}
