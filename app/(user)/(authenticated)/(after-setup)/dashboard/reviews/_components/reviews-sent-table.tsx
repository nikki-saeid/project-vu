import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { Review } from '@/lib/types/db';
import { format } from 'date-fns';

type ReviewsSentTableProps = {
    reviews: Review[];
};

export default function ReviewsSentTable({ reviews }: ReviewsSentTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <Table className="w-full">
                <TableHeader className="sticky top-0 z-10 bg-muted h-full">
                    <TableRow>
                        <TableHead>
                            <P className="text-xs">Name</P>
                        </TableHead>
                        <TableHead>
                            <P className="text-xs">Email</P>
                        </TableHead>
                        <TableHead>
                            <P className="text-xs">Message</P>
                        </TableHead>
                        <TableHead>
                            <P className="text-xs">Status</P>
                        </TableHead>
                        <TableHead>
                            <P className="text-xs">Sent on</P>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell className="p-3">{review.name}</TableCell>
                            <TableCell className="p-3">{review.email}</TableCell>
                            <TableCell className="p-3">{review.request_comment || "No message"}</TableCell>
                            <TableCell className="p-3">
                                <Badge>Sent</Badge>
                            </TableCell>
                            <TableCell className="p-3">{format(new Date(review.created_at), DATE_FORMATS.dateWithTime)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
