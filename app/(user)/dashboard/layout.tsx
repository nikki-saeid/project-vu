import type { ChildrenProp } from '@/lib/types/common';
import PublicProviderInner from './_components/public-provider-inner';
import UserProviderInner from './_components/user-provider-inner';

export default async function UserLayout({ children }: ChildrenProp) {
    return (
        <UserProviderInner>
            <PublicProviderInner>{children}</PublicProviderInner>
        </UserProviderInner>
    );
}
