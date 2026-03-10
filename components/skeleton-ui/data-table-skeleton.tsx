import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

type DataTableSkeletonProps = {
    columnCount?: number;
    rowCount?: number;
};

export default function DataTableSkeleton({ columnCount = 5, rowCount = 10 }: DataTableSkeletonProps) {
    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <Table className="w-full">
                <TableHeader className="sticky top-0 z-10 bg-muted">
                    <TableRow>
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-20" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <TableCell key={colIndex} className="p-4">
                                    <Skeleton className="h-4 w-full max-w-[140px]" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
