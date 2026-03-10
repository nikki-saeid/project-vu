'use client';
import DataCard from '@/components/data-ui/data-card';
import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/lib/contexts/admin-context';
import { IconCurrencyDollar, IconTrendingUp, IconUsers } from '@tabler/icons-react';

export default function Overview() {
    const { activeSubscriptions } = useAdmin();

    return (
        <section>
            <P className="text-muted-foreground mb-4 md:mb-6">These are the key metrics of the platform</P>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                <DataCard
                    title="Total Revenue"
                    description="Total revenue generated from subscriptions"
                    value="$1250"
                    Icon={IconCurrencyDollar}
                    badge={
                        <Badge variant="outline">
                            <IconTrendingUp className="size-4 text-green-500" />
                            12.5%
                        </Badge>
                    }
                />
                <DataCard
                    title="Active Subscriptions"
                    description="Number of active subscriptions"
                    value={activeSubscriptions.toString()}
                    badge={
                        <Badge variant="outline">
                            <IconTrendingUp className="size-4 text-green-500" />
                            19%
                        </Badge>
                    }
                    Icon={IconUsers}
                />
            </div>
        </section>
    );
}
