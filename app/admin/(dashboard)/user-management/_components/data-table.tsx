import P from '@/components/typography/P';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AdminUsersResponse } from '@/lib/api-fetcher/admin/users';
import { format } from 'date-fns';

type DataTableProps = {
    data: AdminUsersResponse;
};

export default function DataTable({ data }: DataTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <Table className="w-full">
                <TableHeader className="sticky top-0 z-10 bg-muted">
                    <TableRow>
                        <TableHead colSpan={1}></TableHead>
                        <TableHead colSpan={1}>
                            <P>Name</P>
                        </TableHead>
                        <TableHead colSpan={1}>
                            <P>Email</P>
                        </TableHead>
                        <TableHead colSpan={1}>
                            <P>Created At</P>
                        </TableHead>
                        <TableHead colSpan={1}>
                            <P>Last Sign In At</P>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="p-4" colSpan={1}>
                                <Avatar>
                                    <AvatarImage src={user.user_metadata.avatar_url ?? ''} />
                                    <AvatarFallback>{user.user_metadata.full_name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="p-4" colSpan={1}>
                                {user.user_metadata.full_name}
                            </TableCell>
                            <TableCell className="p-4" colSpan={1}>
                                {user.email}
                            </TableCell>
                            <TableCell className="p-4" colSpan={1}>
                                {format(new Date(user.created_at), 'MM/dd/yyyy (HH:mm)')}
                            </TableCell>
                            <TableCell className="p-4" colSpan={1}>
                                {format(new Date(user.last_sign_in_at ?? ''), 'MM/dd/yyyy (HH:mm)')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
