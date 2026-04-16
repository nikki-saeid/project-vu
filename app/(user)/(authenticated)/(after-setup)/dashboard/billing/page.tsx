'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { PRICING_PLANS } from '@/lib/constants/pricing-plans';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { IconCurrencyDollarAustralian, IconRefresh, IconSparkles } from '@tabler/icons-react';
import { format } from 'date-fns';
import InvoiceHistory from './_components/invoice-history';
import SubscriptionMoreMenu from './_components/subscription-more-menu';

export default function Billing() {
    const { subscription } = useDashboard();
    const plan = PRICING_PLANS.find((plan) => plan.id === subscription?.plan);
    const invoiceEndDate = subscription?.current_period_end
        ? format(new Date(subscription.current_period_end), DATE_FORMATS.dateWithTime)
        : '-';
    const id = subscription?.stripe_customer_id;

    return (
        <>
            <DashboardCard
                title="Subscription details"
                description="This is your current subscription details."
                badge={<SubscriptionMoreMenu />}
            >
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
        </>
    );
}
