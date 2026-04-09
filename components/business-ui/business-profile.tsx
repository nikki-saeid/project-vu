import { ProjectWithLatLng } from '@/lib/types/api';
import { Business } from '@/lib/types/db';
import { Suspense } from 'react';
import ProjectsTabs from '../project-ui/projects-tabs';
import BusinessProfileSkeleton from '../skeleton-ui/business-profile-skeleton';
import { Separator } from '../ui/separator';
import BusinessIdentity from './business-identity';

type BusinessProfileProps = {
    business: Business | null;
    projects: ProjectWithLatLng[];
    isPublic: boolean;
};

export default function BusinessProfile({ business, projects, isPublic }: BusinessProfileProps) {
    return !business ? (
        <BusinessProfileSkeleton />
    ) : (
        <Suspense fallback={<BusinessProfileSkeleton />}>
            <section>
                <div className="flex flex-col gap-8">
                    <BusinessIdentity business={business} />
                    <Separator />
                    <ProjectsTabs projects={projects} isPublic={isPublic} slug={business.slug ?? ''} />
                </div>
            </section>
        </Suspense>
    );
}
