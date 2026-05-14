'use client';

import BusinessProfile from '@/components/business-ui/business-profile';
import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import ActionMenu from './_components/action-menu';
import LiveButton from './_components/live-button';
import ShareButtons from './_components/share-buttons';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function LivePage() {
    const { business, projects } = useDashboard();

    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const paymentSuccess = searchParams.get('payment') === 'success';

    useEffect(() => {
        if (paymentSuccess) {
            toast.dismiss();
            toast.success('Payment successful! Your subscription has been activated. You can add unlimited projects now.', {
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
                <BusinessProfile business={business} projects={projects} isPublic={false} />
            </div>
        </div>
    );
}
