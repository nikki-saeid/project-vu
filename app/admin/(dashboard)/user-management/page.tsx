'use client';

import EmptyData from '@/components/empty-data';
import DataTableSkeleton from '@/components/skeleton-ui/data-table-skeleton';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { getAdminUsers } from '@/lib/api-fetcher/admin/users';
import { useAdmin } from '@/lib/contexts/admin-context';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import DataTable from './_components/data-table';

export default function UserManagement() {
    const { usersWithPagination, setUsersWithPagination } = useAdmin();
    const [isLoading, setIsLoading] = useState(false);

    // get page from search params
    const searchParams = useSearchParams();
    const pageQuery = searchParams.get('page');

    // set page state
    const page = pageQuery ? Number(pageQuery) : 1;
    const { total, lastPage } = usersWithPagination ?? {};

    useEffect(() => {
        async function _getAdminUsers() {
            try {
                setIsLoading(true);
                const newUsers = await getAdminUsers(page);
                setIsLoading(false);
                setUsersWithPagination(newUsers);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'An error occurred while fetching users.');
            } finally {
                setIsLoading(false);
            }
        }

        _getAdminUsers();
    }, [page, setUsersWithPagination]);

    return (
        <section>
            <P className="text-muted-foreground mb-4 md:mb-6">Manage all users, their details, and statuses below.</P>

            <div className="flex items-center gap-1 flex-1 justify-between mb-3">
                <P>Total Users : {total}</P>
                <div className="flex items-center gap-1">
                    <Link href={page === 1 ? '' : `?page=${page - 1}`}>
                        <Button disabled={page === 1} variant="outline" size="icon-sm">
                            <IconChevronLeft />
                        </Button>
                    </Link>
                    <Link href={page === lastPage ? '' : `?page=${page + 1}`}>
                        <Button disabled={page === lastPage} variant="outline" size="icon-sm">
                            <IconChevronRight />
                        </Button>
                    </Link>
                </div>
            </div>
            {isLoading || !usersWithPagination ? (
                <DataTableSkeleton />
            ) : (
                <Suspense fallback={<DataTableSkeleton />}>
                    {usersWithPagination.users.length === 0 ? (
                        <EmptyData>
                            <P>No users found.</P>
                        </EmptyData>
                    ) : (
                        <DataTable />
                    )}
                </Suspense>
            )}
        </section>
    );
}
