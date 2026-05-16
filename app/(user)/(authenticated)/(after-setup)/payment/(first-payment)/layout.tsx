import { getUserSubscription } from '@/lib/api-fetcher/user/server/subscription';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default async function OnboardingLayout({ children }: ChildrenProp) {
    const subscription = await getUserSubscription();

    if (subscription) {
        redirect('/dashboard/live-page');
    }

    return children;
}
