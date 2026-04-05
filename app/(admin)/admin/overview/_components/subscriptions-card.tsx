'use client';
import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import { PRICING_PLANS_IDS } from '@/lib/constants/pricing-plans';
import { useAdmin } from '@/lib/contexts/admin-context';
import { IconCircle1, IconHexagon6, IconHours12 } from '@tabler/icons-react';

export default function SubscriptionsCard() {
    const { activeSubscriptions } = useAdmin();

    const totalMonthlyPlan = activeSubscriptions?.filter((subscription) => subscription.plan === PRICING_PLANS_IDS.monthly)?.length;
    const total6MonthPlan = activeSubscriptions?.filter((subscription) => subscription.plan === PRICING_PLANS_IDS.six_month)?.length;
    const totalYearlyPlan = activeSubscriptions?.filter((subscription) => subscription.plan === PRICING_PLANS_IDS.annual)?.length;

    return (
        <DashboardCard title="Subscriptions" description="Breakdown of active subscriptions">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <IconCard
                    StyledIconProps={{
                        Icon: IconCircle1,
                    }}
                    label="Total Monthly Plan"
                    title={(totalMonthlyPlan ?? 0) + ''}
                />
                <IconCard
                    StyledIconProps={{
                        Icon: IconHexagon6,
                    }}
                    label="Total 6 Month Plan"
                    title={(total6MonthPlan ?? 0) + ''}
                />
                <IconCard
                    StyledIconProps={{
                        Icon: IconHours12,
                    }}
                    label="Total Yearly Plan"
                    title={(totalYearlyPlan ?? 0) + ''}
                />
            </div>
        </DashboardCard>
    );
}
