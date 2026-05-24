'use client';
import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import { useAdmin } from '@/lib/contexts/admin-context';
import { IconCircle1 } from '@tabler/icons-react';

export default function SubscriptionsCard() {
    const { pricings } = useAdmin();

    const activePrices = pricings ? pricings.filter((pricing) => pricing.active) : [];

    return (
        <DashboardCard title="Subscriptions" description="Breakdown of active subscriptions">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activePrices.map((price) => (
                    <IconCard
                        key={price.id}
                        StyledIconProps={{
                            Icon: IconCircle1,
                        }}
                        label={price.nickname}
                        title={(price.unit_amount ?? 0) / 100}
                    />
                ))}
            </div>
        </DashboardCard>
    );
}
