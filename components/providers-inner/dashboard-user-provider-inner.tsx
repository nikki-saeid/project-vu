import { getUserBusiness } from '@/lib/api-fetcher/user/server/business';
import { getUserPriceById } from '@/lib/api-fetcher/user/server/pricing';
import { getUserProjects } from '@/lib/api-fetcher/user/server/projects';
import { getUserReviews } from '@/lib/api-fetcher/user/server/review';
import { getUserSubscription } from '@/lib/api-fetcher/user/server/subscription';
import { DashboardProvider } from '@/lib/providers/dashboard-provider';
import { PriceResponse, ProjectWithLatLng } from '@/lib/types/api';
import type { ChildrenProp } from '@/lib/types/common';
import { Review, Subscription } from '@/lib/types/db';
import { redirect } from 'next/navigation';

export default async function DashboardUserProviderInner({ children }: ChildrenProp) {
    // get data
    const business = await getUserBusiness();
    if (!business || !business.is_onboarded) {
        redirect('/onboarding/business-profile');
    }

    let projects: ProjectWithLatLng[] | null = null;
    let subscription: Subscription | null = null;
    let reviews: Review[] | null = null;
    let price: PriceResponse | null = null;

    try {
        projects = await getUserProjects();
        subscription = await getUserSubscription();
        reviews = await getUserReviews();
        if (subscription && subscription.price_id) {
            price = await getUserPriceById(subscription.price_id);
        }
    } catch (error) {
        console.error(error);
    }

    return (
        <DashboardProvider
            initialBusiness={business}
            initialReviews={reviews}
            initialProjects={projects}
            initialSubscription={subscription}
            initialPrice={price}
        >
            {children}
        </DashboardProvider>
    );
}
