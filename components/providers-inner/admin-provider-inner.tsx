import { getAdminAnalytics } from '@/lib/api-fetcher/admin/analytics';
import { getAdminUsers } from '@/lib/api-fetcher/admin/users';
import { AdminProvider } from '@/lib/providers/admin-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function AdminProviderInner({ children }: ChildrenProp) {
    const { activeSubscriptions } = await getAdminAnalytics();
    const usersWithPagination = await getAdminUsers(1);

    return (
        <AdminProvider initialActiveSubscriptions={activeSubscriptions} initialUsersWithPagination={usersWithPagination}>
            {children}
        </AdminProvider>
    );
}
