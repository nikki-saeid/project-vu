import { getUserAuth } from '@/lib/api-fetcher/user/server/auth';
import { getPublicBusinessBySlug } from '@/lib/api-fetcher/user/server/business';
import { getPublicProjectsBySlug } from '@/lib/api-fetcher/user/server/projects';
import { DEMO_SLUG } from '@/lib/constants/urls';
import { UserProvider } from '@/lib/providers/user-provider';
import { ProjectWithLatLng } from '@/lib/types/api';
import type { ChildrenProp } from '@/lib/types/common';
import { Business } from '@/lib/types/db';

export default async function UserProviderInner({ children }: ChildrenProp) {
    const user = await getUserAuth();
    let demoProjects: ProjectWithLatLng[] | null = null;
    let demoBusiness: Business | null = null;

    try {
        demoProjects = await getPublicProjectsBySlug(DEMO_SLUG);
        demoBusiness = await getPublicBusinessBySlug(DEMO_SLUG);
    } catch (error) {
        console.error(error);
    }

    return (
        <UserProvider initialUser={user} initialDemoBusiness={demoBusiness} initialDemoProjects={demoProjects}>
            {children}
        </UserProvider>
    );
}
