import DashboardOnboardingProviderInner from '@/components/providers-inner/dashboard-onboarding-provider-inner';
import type { ChildrenProp } from '@/lib/types/common';

export const metadata = {
    title: 'Onboarding',
};

export default function BeforeSetupLayout({ children }: ChildrenProp) {
    return <DashboardOnboardingProviderInner>{children}</DashboardOnboardingProviderInner>;
}
