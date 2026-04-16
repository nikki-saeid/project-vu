'use client';

import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';
import P from '@/components/typography/P';
import WarningAlert from '@/components/warning-alert';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { ChildrenProp } from '@/lib/types/common';
import { format } from 'date-fns';

export default function Layout({ children }: ChildrenProp) {
    const { subscription } = useDashboard();
    const isCanceled = subscription?.cancel_at_period_end;
    const invoiceEndDate = subscription?.current_period_end
        ? format(new Date(subscription.current_period_end), DATE_FORMATS.dateWithTime)
        : '-';

    return (
        <div>
            <DashboardSubNavbar />
            <div className="flex flex-col md:gap-6 gap-4 p-4 md:p-6">
                {isCanceled && (
                    <WarningAlert
                        title="Subscription is canceled."
                        description={`Your business profile will be unpublished after the ${invoiceEndDate}.`}
                    />
                )}
                <P className="text-muted-foreground">Manage your subscription and see your billing history.</P>

                {children}
            </div>
        </div>
    );
}
