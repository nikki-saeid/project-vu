'use client';

import EmptyData from '@/components/empty-data';
import DataTableSkeleton from '@/components/skeleton-ui/data-table-skeleton';
import P from '@/components/typography/P';
import { useAdmin } from '@/lib/contexts/admin-context';
import { Suspense } from 'react';
import DataTable from './_components/data-table';

export default function UserManagement() {
    const { usersWithPagination } = useAdmin();

    return (
        <section>
            <P className="text-muted-foreground mb-4 md:mb-6">Manage all users, their details, and statuses below.</P>

            {!usersWithPagination ? (
                <DataTableSkeleton />
            ) : (
                <Suspense fallback={<DataTableSkeleton />}>
                    {usersWithPagination.users.length === 0 ? (
                        <EmptyData>
                            <P>No users found.</P>
                        </EmptyData>
                    ) : (
                        <DataTable data={usersWithPagination} />
                    )}
                </Suspense>
            )}
        </section>
    );
}
