import IsAdminLayer from '@/components/security-layers/is-admin-layer';
import { ChildrenProp } from '@/lib/types/common';
import UserProviderInner from './_components/user-provider-inner';

export default async function UserLayout({ children }: ChildrenProp) {
    return (
        <IsAdminLayer>
            <UserProviderInner>{children}</UserProviderInner>
        </IsAdminLayer>
    );
}
