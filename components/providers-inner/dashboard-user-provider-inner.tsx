import { getUserBusiness } from '@/lib/api-fetcher/user/server/business';
import { getUserProjects } from '@/lib/api-fetcher/user/server/projects';
import { getUserSubscription } from '@/lib/api-fetcher/user/server/subscription';
import { DashboardProvider } from '@/lib/providers/dashboard-provider';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default async function DashboardUserProviderInner({ children }: ChildrenProp) {
    // get data
    const business = await getUserBusiness();
    if (!business || !business.is_onboarded) {
        redirect('/onboarding/business-profile');
    }

    const projects = await getUserProjects();
    const subscription = await getUserSubscription();

    return (
        <DashboardProvider initialBusiness={business} initialProjects={projects} initialSubscription={subscription}>
            {children}
        </DashboardProvider>
    );
}
