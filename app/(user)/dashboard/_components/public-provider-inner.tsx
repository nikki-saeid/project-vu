import { getUserBusiness } from '@/lib/api-fetcher/user/user-business';
import { getUserProjects } from '@/lib/api-fetcher/user/user-projects';
import { PublicProvider } from '@/lib/providers/public-provider';
import type { ChildrenProp } from '@/lib/types/common';

export default async function PublicProviderInner({ children }: ChildrenProp) {
    const business = await getUserBusiness();
    const projects = await getUserProjects();

    return (
        <PublicProvider initialBusiness={business} initialProjects={projects}>
            {children}
        </PublicProvider>
    );
}
