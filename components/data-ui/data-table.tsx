import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type TableHeaderType = {
    title: string;
    columnSpan: number;
};

type TableCellType = {
    id: string;
    content: React.ReactNode;
    columnSpan: number;
};

type TableRowType = {
    cells: TableCellType[];
    id: string;
};
export type DataTableProps = {
    header: TableHeaderType[];
    rows: TableRowType[];
};

export default function DataTable({ header, rows }: DataTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted">
                    <TableRow>
                        {header.map((head) => {
                            return (
                                <TableHead key={head.title} colSpan={head.columnSpan}>
                                    {head.title}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.cells.map((cell) => (
                                <TableCell className="p-4" key={cell.id} colSpan={cell.columnSpan}>
                                    {cell.content}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
