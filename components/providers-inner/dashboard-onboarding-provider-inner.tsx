import { getUserBusiness } from '@/lib/api-fetcher/user/server/business';
import { DashboardProvider } from '@/lib/providers/dashboard-provider';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default async function DashboardOnboardingProviderInner({ children }: ChildrenProp) {
    // get data
    const business = await getUserBusiness();

    if (business && business.is_onboarded) {
        redirect('/dashboard/live-page');
    }

    return (
        <DashboardProvider initialBusiness={business} initialProjects={null} initialSubscription={null}>
            {children}
        </DashboardProvider>
    );
}
