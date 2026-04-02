'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import P from '@/components/typography/P';
import { PRICING_PLANS } from '@/lib/constants/pricing-plans';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { IconCurrencyDollarAustralian, IconRefresh, IconSparkles } from '@tabler/icons-react';
import { format } from 'date-fns';
import InvoiceHistory from './_components/invoice-history';
import { DATE_FORMATS } from '@/lib/constants/date-formats';

export default function Billing() {
    const { subscription } = useDashboard();
    const plan = PRICING_PLANS.find((plan) => plan.id === subscription?.plan);

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <P className="text-muted-foreground">Manage your subscription and see your billing history.</P>

            <DashboardCard title="Subscription details" description="This is your current subscription details.">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <IconCard Icon={IconSparkles} label="Plan" title={plan?.name ?? ''} />
                    <IconCard Icon={IconCurrencyDollarAustralian} label="Fees" title={`${plan?.priceLabel}/month`} />
                    <IconCard
                        Icon={IconRefresh}
                        label="Your plan renews"
                        title={format(new Date(subscription?.current_period_end || ''), DATE_FORMATS.date)}
                    />
                </div>
            </DashboardCard>

            <DashboardCard title="Invoice history" description="You can see your invoice history here.">
                {subscription?.stripe_customer_id && <InvoiceHistory stripe_customer_id={subscription.stripe_customer_id} />}
            </DashboardCard>
        </div>
    );
}
