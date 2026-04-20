import { getUserBusiness, updateOnboardingStatus, updatePageStatus } from '@/lib/api-fetcher/user/server/business';
import { getUserProjects } from '@/lib/api-fetcher/user/server/projects';
import { getUserSubscription } from '@/lib/api-fetcher/user/server/subscription';
import { DashboardProvider } from '@/lib/providers/dashboard-provider';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export default async function DashboardUserProviderInner({ children }: ChildrenProp) {
    // get data
    let business = await getUserBusiness();
    const projects = await getUserProjects();
    const subscription = await getUserSubscription();

    if (!subscription || !business) {
        redirect('/onboarding/business-profile');
    }

    // get subscription status
    const status = subscription.status as Stripe.Subscription.Status;
    const currentPeriodEnd = new Date(subscription?.current_period_end ?? '');

    // if subscription is not active
    if (status !== 'active' || currentPeriodEnd.getTime() < new Date().getTime()) {
        await updatePageStatus('draft');
        redirect('/payment-failed');
    }

    // if subscription became active and business is not onboarded
    if (status === 'active' && !business.is_onboarded) {
        business = await updateOnboardingStatus(true);
    } else if (!business.is_onboarded) {
        redirect('/onboarding/business-profile');
    }

    return (
        <DashboardProvider initialBusiness={business} initialProjects={projects} initialSubscription={subscription}>
            {children}
        </DashboardProvider>
    );
}
