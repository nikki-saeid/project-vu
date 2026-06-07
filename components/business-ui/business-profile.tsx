import { ProjectWithLatLng } from '@/lib/types/api';
import { Business, Review } from '@/lib/types/db';
import { Suspense } from 'react';
import ProjectsTabs from '../project-ui/projects-tabs';
import BusinessProfileSkeleton from '../skeleton-ui/business-profile-skeleton';
import { Separator } from '../ui/separator';
import BusinessIdentity from './business-identity';

type BusinessProfileProps = {
    business: Business | null;
    projects: ProjectWithLatLng[];
    reviews: Review[] | null;
    isPublic: boolean;
};

export default function BusinessProfile({ business, projects, isPublic, reviews }: BusinessProfileProps) {
    return !business ? (
        <BusinessProfileSkeleton />
    ) : (
        <Suspense fallback={<BusinessProfileSkeleton />}>
            <section>
                <div className="flex flex-col gap-8">
                    <BusinessIdentity isPublic={isPublic} business={business} reviews={reviews ?? []} />
                    <Separator />
                    <ProjectsTabs projects={projects} isPublic={isPublic} slug={business.slug ?? ''} />
                </div>
            </section>
        </Suspense>
    );
}
