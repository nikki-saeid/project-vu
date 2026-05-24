'use client';

import EmptyData from '@/components/empty-data';
import TableSkeleton from '@/components/skeleton-ui/table-skeleton';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { adminGetUsers } from '@/lib/api-fetcher/admin/server/users';
import { useAdmin } from '@/lib/contexts/admin-context';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import UsersTable from './_components/users-table';
import { Badge } from '@/components/ui/badge';
import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';

export default function UserManagement() {
    const { usersWithPagination, setUsersWithPagination } = useAdmin();

    // get page from search params
    const searchParams = useSearchParams();
    const pageQuery = searchParams.get('page');

    // set page state
    const page = pageQuery ? Number(pageQuery) : 1;
    const { total, lastPage } = usersWithPagination ?? {};

    const { data, isPending } = useQuery({
        queryKey: ['revenue', page],
        queryFn: async () => await adminGetUsers(page),
        initialData: usersWithPagination,
    });

    // ! ------------- Not ideal
    useEffect(() => {
        if (data) {
            setUsersWithPagination(data);
        }
    }, [data, setUsersWithPagination]);

    return (
        <div>
            <DashboardSubNavbar />
            <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6">
                <P className="text-muted-foreground">Manage all users, their details, and statuses below.</P>

                <div>
                    <div className="flex items-center gap-1 flex-1 justify-between mb-2">
                        <Badge variant="outline">Total Users : {total}</Badge>
                        <div className="flex items-center gap-0.5">
                            {page === 1 ? (
                                <Button className="rounded-full" disabled variant="outline" size="icon-sm">
                                    <IconChevronLeft />
                                </Button>
                            ) : (
                                <Link href={`?page=${page - 1}`}>
                                    <Button className="rounded-full" variant="outline" size="icon-sm">
                                        <IconChevronLeft />
                                    </Button>
                                </Link>
                            )}
                            {page === lastPage ? (
                                <Button className="rounded-full" disabled variant="outline" size="icon-sm">
                                    <IconChevronRight />
                                </Button>
                            ) : (
                                <Link href={`?page=${page + 1}`}>
                                    <Button className="rounded-full" variant="outline" size="icon-sm">
                                        <IconChevronRight />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                    {isPending ? (
                        <TableSkeleton />
                    ) : (
                        <Suspense fallback={<TableSkeleton />}>
                            {usersWithPagination?.users.length === 0 ? (
                                <EmptyData>
                                    <P>No users found.</P>
                                </EmptyData>
                            ) : (
                                <UsersTable />
                            )}
                        </Suspense>
                    )}
                </div>
            </div>
        </div>
    );
}
