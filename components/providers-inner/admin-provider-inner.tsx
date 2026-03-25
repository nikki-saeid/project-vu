import { AdminUsersResponse, getAdminUsers } from '@/lib/api-fetcher/admin/users';
import { AdminProvider } from '@/lib/providers/admin-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function AdminProviderInner({ children }: ChildrenProp) {
    // const { activeSubscriptions } = await getAdminAnalytics() ;
    const usersWithPagination = (await getAdminUsers(1)) as AdminUsersResponse;

    return (
        // <AdminProvider initialActiveSubscriptions={activeSubscriptions} initialUsersWithPagination={usersWithPagination}>
        <AdminProvider initialActiveSubscriptions={10} initialUsersWithPagination={usersWithPagination}>
            {children}
        </AdminProvider>
    );
}
