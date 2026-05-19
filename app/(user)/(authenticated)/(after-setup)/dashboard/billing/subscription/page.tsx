'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import CancelSubscriptionDialog from '../_components/cancel-subscription-dialog';
import ResumeSubscriptionDialog from '../_components/resume-subscription-dialog';

export default function SubBilling() {
    const { subscription } = useDashboard();
    const isCanceled = subscription?.cancel_at_period_end;

    // -----------
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const cardUpdated = searchParams.get('card_updated') === 'success';

    useEffect(() => {
        if (cardUpdated) {
            toast.dismiss();
            toast.success('Payment method updated successfully!', {
                duration: 3000,
                onDismiss: () => {
                    router.replace(pathname);
                },
                onAutoClose: () => {
                    router.replace(pathname);
                },
            });
        }
    }, [pathname, cardUpdated, router]);

    return (
        <>
            {isCanceled ? (
                <DashboardCard title="Resume subscription" description="You can resume your subscription here.">
                    <div className="flex justify-end">
                        <ResumeSubscriptionDialog />
                    </div>
                </DashboardCard>
            ) : (
                <DashboardCard title="Cancel subscription" description="You can cancel your subscription here.">
                    <div className="flex justify-end">
                        <CancelSubscriptionDialog />
                    </div>
                </DashboardCard>
            )}
        </>
    );
}
