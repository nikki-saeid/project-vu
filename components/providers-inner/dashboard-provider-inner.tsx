import { getUserBusiness } from '@/lib/api-fetcher/user/user-business';
import { getUserProjects } from '@/lib/api-fetcher/user/user-projects';
import { DashboardProvider } from '@/lib/providers/dashboard-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function DashboardProviderInner({ children }: ChildrenProp) {
    const business = await getUserBusiness();
    const projects = await getUserProjects();

    return (
        <DashboardProvider initialBusiness={business} initialProjects={projects}>
            {children}
        </DashboardProvider>
    );
}
