import { getUserBusiness, updateOnboardingStatus } from '@/lib/api-fetcher/user/server/business';
import { getUserProjects } from '@/lib/api-fetcher/user/server/projects';
import { getUserSubscription } from '@/lib/api-fetcher/user/server/subscription';
import { DashboardProvider } from '@/lib/providers/dashboard-provider';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export default async function DashboardOnboardingProviderInner({ children }: ChildrenProp) {
    // get data
    let business = await getUserBusiness();
    const projects = await getUserProjects();
    const subscription = await getUserSubscription();

    if (subscription && business) {
        // get subscription status
        const status = subscription.status as Stripe.Subscription.Status;

        if (status === 'active') {
            if (!business.is_onboarded) {
                business = await updateOnboardingStatus(true);
            }
            redirect('/dashboard/live-page');
        }
    }

    // if subscription became active and business is not onboarded

    return (
        <DashboardProvider initialBusiness={business} initialProjects={projects} initialSubscription={subscription}>
            {children}
        </DashboardProvider>
    );
}
