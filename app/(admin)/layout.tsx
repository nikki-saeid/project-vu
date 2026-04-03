import AdminProviderInner from '@/components/providers-inner/admin-provider-inner';
import { ChildrenProp } from '@/lib/types/common';

export default async function UserLayout({ children }: ChildrenProp) {
    return <AdminProviderInner>{children}</AdminProviderInner>;
}
