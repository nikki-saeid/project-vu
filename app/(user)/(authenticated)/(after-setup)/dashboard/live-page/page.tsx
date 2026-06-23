'use client';

import BusinessProfile from '@/components/business-ui/business-profile';
import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { addMonths } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import ActionMenu from './_components/action-menu';
import LiveButton from './_components/live-button';
import ShareButtons from './_components/share-buttons';
import { MAX_MONTHS_FREE_PLAN } from '@/lib/constants/pricing-plans';
import WarningAlert from '@/components/warning-alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LivePage() {
    const { business, projects, reviews, subscription } = useDashboard();

    // in case of subscriptio problem
    let noSubscription: boolean = false;

    if (
        (subscription &&
            (subscription.status !== 'active' || new Date(subscription.current_period_end ?? '').getTime() < new Date().getTime())) ||
        addMonths(business?.created_at ?? '', MAX_MONTHS_FREE_PLAN).getTime() < new Date().getTime()
    ) {
        noSubscription = true;
    }

    const reviewsDone = reviews ? reviews.filter((review) => review.status === 'done') : [];

    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const paymentSuccess = searchParams.get('payment') === 'success';

    useEffect(() => {
        if (paymentSuccess) {
            toast.dismiss();
            toast.success('Payment successful! Your subscription has been activated. You can add unlimited projects now.', {
                duration: 3000,
                onDismiss: () => {
                    router.replace(pathname);
                },
                onAutoClose: () => {
                    router.replace(pathname);
                },
            });
        }
    }, [pathname, paymentSuccess, router]);

    return (
        <div>
            <DashboardSubNavbar noBack>
                <div></div>
                <div className="flex justify-end gap-2">
                    <LiveButton />
                    <ShareButtons />
                    <ActionMenu />
                </div>
            </DashboardSubNavbar>

            <div className="flex flex-col gap-4 p-4 md:p-6">
                {noSubscription && (
                    <WarningAlert
                        title="Subscription needs to be upgraded"
                        description="You have reached the maximum number of projects or susbcription was unsuccessful, Please upgrade your plan to add unlimited projects"
                        action={
                            <Link href="/payment/subscription-plan">
                                <Button size="sm">Upgrade now</Button>
                            </Link>
                        }
                    />
                )}

                <BusinessProfile business={business} projects={projects} isPublic={false} reviews={reviewsDone} />
            </div>
        </div>
    );
}
