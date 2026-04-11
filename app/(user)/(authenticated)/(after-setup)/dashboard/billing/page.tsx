'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import P from '@/components/typography/P';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { PRICING_PLANS } from '@/lib/constants/pricing-plans';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { IconCurrencyDollarAustralian, IconRefresh, IconSparkles } from '@tabler/icons-react';
import { format } from 'date-fns';
import CancelSubscriptionDialog from './_components/cancel-subscription-dialog';
import InvoiceHistory from './_components/invoice-history';
import ResumeSubscriptionDialog from './_components/resume-subscription-dialog';
import WarningAlert from '@/components/warning-alert';
import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';

export default function Billing() {
    const { subscription } = useDashboard();
    const plan = PRICING_PLANS.find((plan) => plan.id === subscription?.plan);
    const isCanceled = subscription?.cancel_at_period_end;
    const invoiceEndDate = subscription?.current_period_end
        ? format(new Date(subscription.current_period_end), DATE_FORMATS.dateWithTime)
        : '-';
    const id = subscription?.stripe_customer_id;

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

                <DashboardCard title="Subscription details" description="This is your current subscription details.">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <IconCard
                            StyledIconProps={{
                                Icon: IconSparkles,
                            }}
                            label="Plan"
                            title={plan?.name ?? ''}
                        />
                        <IconCard
                            StyledIconProps={{
                                Icon: IconCurrencyDollarAustralian,
                            }}
                            label="Fees"
                            title={`${plan?.priceLabel}/month`}
                        />
                        <IconCard
                            StyledIconProps={{
                                Icon: IconRefresh,
                            }}
                            label="Your plan renews"
                            title={invoiceEndDate}
                        />
                    </div>
                </DashboardCard>

                <DashboardCard title="Invoice history" description="You can see your invoice history here.">
                    {id && <InvoiceHistory stripe_customer_id={id} />}
                </DashboardCard>
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
            </div>
        </div>
    );
}
