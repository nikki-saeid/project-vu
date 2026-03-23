import { ChildrenProp } from '@/lib/types/common';
import UserProviderInner from './_components/user-provider-inner';
import AdminProviderInner from './_components/admin-provider-inner';

export default async function UserLayout({ children }: ChildrenProp) {
    return (
        <UserProviderInner>
            <AdminProviderInner>{children}</AdminProviderInner>
        </UserProviderInner>
    );
}
