import { getPublicBusinessBySlug, getPublicProjectsBySlug } from '@/lib/api-fetcher/user/public-profile';
import { PublicProvider } from '@/lib/providers/public-provider';
import type { ChildrenProp } from '@/lib/types/common';
import { Business } from '@/lib/types/db';
import { ProjectWithImages } from '@/lib/types/api';
import { notFound } from 'next/navigation';

type PublicProviderInnerProps = ChildrenProp & { slug: string; user_view?: string };

export default async function PublicProviderInner({ children, slug, user_view }: PublicProviderInnerProps) {
    const isUserView = user_view === 'true';

    let business: Business | null = null;
    let projects: ProjectWithImages[] | null = null;

    try {
        business = await getPublicBusinessBySlug(slug, isUserView);
        projects = await getPublicProjectsBySlug(slug, isUserView);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return notFound();
        }
        return notFound();
    }

    return (
        <PublicProvider isPublic={true} initialBusiness={business} initialProjects={projects}>
            {children}
        </PublicProvider>
    );
}
