import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { cn } from '@/lib/utils/classes-merge';
import { unixToFormatString } from '@/lib/utils/unixToString';
import Stripe from 'stripe';

type InvoicesTableProps = {
    invoices: Stripe.Invoice[];
};

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <Table className="w-full">
                <TableHeader className="sticky top-0 z-10 bg-muted h-full">
                    <TableRow>
                        <TableHead>
                            <P className="text-xs">Receipt number</P>
                        </TableHead>
                        <TableHead>
                            <P className="text-xs">Amount paid</P>
                        </TableHead>
                        <TableHead>
                            <P className="text-xs">Status</P>
                        </TableHead>
                        <TableHead>
                            <P className="text-xs">Effective at</P>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="p-3 lowercase">{invoice.number}</TableCell>
                            <TableCell className="p-3  uppercase">{`${invoice.currency} ${(invoice.amount_paid / 100).toFixed(2)}`}</TableCell>
                            <TableCell className="p-3 ">
                                <Badge
                                    className={cn(
                                        invoice.status === 'paid'
                                            ? 'bg-green-500/5 text-green-500'
                                            : invoice.status === 'uncollectible'
                                              ? 'bg-red-500/5 text-red-500'
                                              : 'bg-yellow-500/5 text-yellow-500',
                                        'uppercase',
                                    )}
                                >
                                    {invoice.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="p-3 lowercase ">
                                {invoice.effective_at
                                    ? unixToFormatString(invoice.effective_at, DATE_FORMATS.dateWithTime)
                                    : 'Not paid yet'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
