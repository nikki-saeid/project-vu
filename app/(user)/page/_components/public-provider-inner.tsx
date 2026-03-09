import { getPublicBusinessBySlug, getPublicProjectsBySlug } from '@/lib/api-fetcher/public-profile';
import { PublicProvider } from '@/lib/providers/public-provider';
import type { ChildrenProp } from '@/lib/types/common';

type PublicProviderInnerProps = ChildrenProp & { params: { slug: string } };

export default async function PublicProviderInner({ children, params }: PublicProviderInnerProps) {
    const { slug } = params;
    const business = await getPublicBusinessBySlug(slug);
    const projects = await getPublicProjectsBySlug(slug);

    return (
        <PublicProvider initialBusiness={business} initialProjects={projects}>
            {children}
        </PublicProvider>
    );
}
