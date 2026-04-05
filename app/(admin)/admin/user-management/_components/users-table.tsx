import P from '@/components/typography/P';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdmin } from '@/lib/contexts/admin-context';
import { format } from 'date-fns';
import ActionMenu from './action-menu';
import { DATE_FORMATS } from '@/lib/constants/date-formats';

export default function UsersTable() {
    const { usersWithPagination } = useAdmin();

    return (
        <div className="flex flex-col gap-1">
            <div className="overflow-hidden rounded-lg border bg-card">
                <Table className="w-full">
                    <TableHeader className="sticky top-0 z-10 bg-muted h-full">
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>
                                <P className="text-xs">Name</P>
                            </TableHead>
                            <TableHead>
                                <P className="text-xs">Email</P>
                            </TableHead>
                            <TableHead>
                                <P className="text-xs">Status</P>
                            </TableHead>
                            <TableHead>
                                <P className="text-xs">Created At</P>
                            </TableHead>
                            <TableHead>
                                <P className="text-xs">Last Sign In At</P>
                            </TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersWithPagination?.users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="p-3">
                                    <Avatar>
                                        <AvatarImage src={user.user_metadata.avatar_url ?? ''} />
                                        <AvatarFallback>{user.user_metadata.full_name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="p-3">{user.user_metadata.full_name}</TableCell>
                                <TableCell className="p-3">{user.email}</TableCell>
                                <TableCell className="p-3">
                                    {user.role === 'admin' ? (
                                        <Badge>ADMIN</Badge>
                                    ) : user.banned_until ? (
                                        <Badge className="bg-red-500/10 text-red-500">BANNED</Badge>
                                    ) : (
                                        <Badge className="bg-green-500/10 text-green-500">ACTIVE</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="p-3">{format(new Date(user.created_at), DATE_FORMATS.dateWithTime)}</TableCell>
                                <TableCell className="p-3">
                                    {user.last_sign_in_at
                                        ? format(new Date(user.last_sign_in_at), DATE_FORMATS.dateWithTime)
                                        : 'Not signed in yet'}
                                </TableCell>
                                <TableCell className="p-3" width="10">
                                    {user.role !== 'admin' && <ActionMenu user={user} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
