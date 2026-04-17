'use client';
import { getInvoiceList } from '@/lib/api-fetcher/stripe/server';
import InvoicesTable from './invoices-table';
import { useQuery } from '@tanstack/react-query';
import TableSkeleton from '@/components/skeleton-ui/table-skeleton';
import EmptyData from '@/components/empty-data';
import P from '@/components/typography/P';
import { Suspense } from 'react';

type InvoiceHistoryProps = {
    stripe_customer_id: string;
};

export default function InvoiceHistory({ stripe_customer_id }: InvoiceHistoryProps) {
    const { data, isFetching } = useQuery({
        queryKey: ['invoices', stripe_customer_id],
        queryFn: async () => await getInvoiceList(stripe_customer_id),
        staleTime: Infinity,
    });

    return isFetching ? (
        <TableSkeleton columnCount={3} rowCount={3} />
    ) : !data || (data && data.length === 0) ? (
        <EmptyData>
            <P>No invoices found.</P>
        </EmptyData>
    ) : (
        <Suspense fallback={<TableSkeleton columnCount={3} />}>
            <InvoicesTable invoices={data} />
        </Suspense>
    );
}
