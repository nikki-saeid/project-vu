import { adminGetAllPricing } from '@/lib/api-fetcher/admin/server/pricing';
import { adminGetActiveSubscriptions } from '@/lib/api-fetcher/admin/server/subscription';
import { adminGetUsers } from '@/lib/api-fetcher/admin/server/users';
import { AdminProvider } from '@/lib/providers/admin-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function AdminProviderInner({ children }: ChildrenProp) {
    const usersWithPagination = await adminGetUsers(1);
    const activeSubscriptions = await adminGetActiveSubscriptions();
    const pricings = await adminGetAllPricing();

    return (
        <AdminProvider
            initialActiveSubscriptions={activeSubscriptions ?? []}
            initialUsersWithPagination={usersWithPagination}
            initialPricings={pricings}
        >
            {children}
        </AdminProvider>
    );
}
