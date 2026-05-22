import { getUserBusiness } from '@/lib/api-fetcher/user/server/business';
import { getUserProjects } from '@/lib/api-fetcher/user/server/projects';
import { getUserReviews } from '@/lib/api-fetcher/user/server/review';
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
    const reviews = await getUserReviews();

    return (
        <DashboardProvider
            initialBusiness={business}
            initialReviews={reviews}
            initialProjects={projects}
            initialSubscription={subscription}
        >
            {children}
        </DashboardProvider>
    );
}
