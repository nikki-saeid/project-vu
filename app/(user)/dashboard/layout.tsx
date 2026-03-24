import DashboardProviderInner from '@/components/providers-inner/dashboard-provider-inner';
import type { ChildrenProp } from '@/lib/types/common';

export default async function UserLayout({ children }: ChildrenProp) {
    return <DashboardProviderInner>{children}</DashboardProviderInner>;
}
