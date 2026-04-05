'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import IconCard from '@/components/dashboard-ui/icon-card';
import { useAdmin } from '@/lib/contexts/admin-context';
import { IconUserDollar, IconUsers } from '@tabler/icons-react';

export default function UsersCard() {
    const { usersWithPagination, activeSubscriptions } = useAdmin();

    return (
        <DashboardCard title="Users" description="Breakdown of users inside the platform">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <IconCard
                    StyledIconProps={{
                        Icon: IconUserDollar,
                    }}
                    label="Total Paying Users"
                    title={(activeSubscriptions?.length ?? 0) + ''}
                />
                <IconCard
                    StyledIconProps={{
                        Icon: IconUsers,
                    }}
                    label="Total Users Signed up"
                    title={(usersWithPagination?.users.length ?? 0) + ''}
                />
            </div>
        </DashboardCard>
    );
}
