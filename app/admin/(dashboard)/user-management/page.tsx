import EmptyData from '@/components/empty-data';
import DataTableSkeleton from '@/components/skeleton-ui/data-table-skeleton';
import P from '@/components/typography/P';
import { getAdminUsers } from '@/lib/api-fetcher/admin/users';
import { Suspense } from 'react';
import DataTable from './_components/data-table';

export default async function UserManagement() {
    const data = await getAdminUsers();

    return !data ? (
        <DataTableSkeleton />
    ) : (
        <>
            {data.users.length === 0 ? (
                <EmptyData>
                    <P>No users found.</P>
                </EmptyData>
            ) : (
                <Suspense fallback={<DataTableSkeleton />}>
                    <DataTable data={data} />
                </Suspense>
            )}
        </>
    );
}
