'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import IconCardSkeleton from '@/components/skeleton-ui/icon-card-skeleton';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { adminGetAnalyticsRevenueByMonth } from '@/lib/api-fetcher/admin/client/analytics';
import { getMonthByIndex, getMonthIndex, getPresentMonths } from '@/lib/utils/months';
import { IconChevronDown, IconCurrencyDollar } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

type RevenueCardContentProps = {
    initialData: number;
};

export default function RevenueCardContent({ initialData }: RevenueCardContentProps) {
    // get all months
    const MONTHS = useMemo(() => getPresentMonths(), []);
    const getMonthIndexCallback = useCallback((month: string | null) => getMonthIndex(month), []);

    // set month state
    const [month, setMonth] = useState(getMonthIndexCallback(null));

    // handle change month
    const handleChangeMonth = (newMonth: string) => {
        setMonth(getMonthIndex(newMonth));
    };

    // query from backend
    const { data, isPending } = useQuery({
        queryKey: ['revenue', month],
        queryFn: async () => await adminGetAnalyticsRevenueByMonth(month),
        initialData,
    });

    return (
        <DashboardCard
            title="Revenue by month"
            description="Breakdown of revenue generated so far per month"
            badge={
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="xs" variant="outline" className="capitalize">
                            {getMonthByIndex(month)}
                            <IconChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                        <DropdownMenuGroup>
                            {MONTHS.map((monthStr) => (
                                <DropdownMenuItem key={monthStr} onClick={() => handleChangeMonth(monthStr)}>
                                    {monthStr}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isPending ? (
                    <IconCardSkeleton />
                ) : (
                    <IconCard
                        StyledIconProps={{
                            Icon: IconCurrencyDollar,
                        }}
                        label="Total Revenue"
                        title={`$${data ?? 0}`}
                    />
                )}
            </div>
        </DashboardCard>
    );
}
