import { getPublicBusinessBySlug } from '@/lib/api-fetcher/user/server/business';
import { getPublicProjectsBySlug } from '@/lib/api-fetcher/user/server/projects';
import { getPublicReviewsBySlug } from '@/lib/api-fetcher/user/server/review';
import { PublicProvider } from '@/lib/providers/public-provider';
import { ProjectWithLatLng } from '@/lib/types/api';
import type { ChildrenProp } from '@/lib/types/common';
import { Business, Review } from '@/lib/types/db';
import { notFound } from 'next/navigation';

type PublicProviderInnerProps = ChildrenProp & { slug: string };

export default async function PublicProviderInner({ children, slug }: PublicProviderInnerProps) {
    let business: Business | null = null;
    let projects: ProjectWithLatLng[] | null = null;
    let reviews: Review[] | null = null;

    try {
        business = await getPublicBusinessBySlug(slug);
        projects = await getPublicProjectsBySlug(slug);
        reviews = await getPublicReviewsBySlug(slug);
    } catch (error) {
        return notFound();
    }

    return (
        <PublicProvider initialBusiness={business} initialProjects={projects} initialReviews={reviews}>
            {children}
        </PublicProvider>
    );
}
