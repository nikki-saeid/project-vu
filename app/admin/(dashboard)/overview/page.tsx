import EmptyData from '@/components/empty-data';
import P from '@/components/typography/P';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAdminUsers } from '@/lib/api-fetcher/admin/users';
import { Suspense } from 'react';
import DataTableSkeleton from '@/components/skeleton-ui/data-table-skeleton';

export default async function Overview() {
    const data = await getAdminUsers();

    return data ? (
        <EmptyData>
            <P>No data found</P>
        </EmptyData>
    ) : (
        <Suspense fallback={<DataTableSkeleton />}>
            <div className="overflow-hidden rounded-lg border bg-card">
                <Table className="w-full">
                    <TableHeader className="sticky top-0 z-10 bg-muted">
                        <TableRow>
                            <TableHead colSpan={1}></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="p-4" colSpan={1}></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Suspense>
    );
}
