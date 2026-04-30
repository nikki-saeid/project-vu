import DashboardUserProviderInner from '@/components/providers-inner/dashboard-user-provider-inner';
import type { ChildrenProp } from '@/lib/types/common';

export const metadata = {
    title: 'Dashboard',
};

export default function AfterSetupLayout({ children }: ChildrenProp) {
    return <DashboardUserProviderInner>{children}</DashboardUserProviderInner>;
}
