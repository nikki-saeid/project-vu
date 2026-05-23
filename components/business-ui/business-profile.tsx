import { ProjectWithLatLng } from '@/lib/types/api';
import { Business, Review } from '@/lib/types/db';
import { Suspense } from 'react';
import ProjectsTabs from '../project-ui/projects-tabs';
import ReviewList from '../review-ui/review-list';
import BusinessProfileSkeleton from '../skeleton-ui/business-profile-skeleton';
import P from '../typography/P';
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
                    <BusinessIdentity business={business} />
                    <Separator />
                    <ProjectsTabs projects={projects} isPublic={isPublic} slug={business.slug ?? ''} />
                    {reviews && reviews.length > 0 && (
                        <>
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <P className="font-semibold">Reviews</P>
                                <ReviewList reviews={reviews} />
                            </div>
                        </>
                    )}
                </div>
            </section>
        </Suspense>
    );
}
