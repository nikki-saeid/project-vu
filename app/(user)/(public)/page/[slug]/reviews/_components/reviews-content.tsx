'use client';

import BusinessHeader from '@/components/business-ui/business-header';
import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import EmptyData from '@/components/empty-data';
import NavbarLivePage from '@/components/public-pages-ui/navbars/navbar-live-page';
import ReviewList from '@/components/review-ui/review-list';
import ReviewsBreakdown from '@/components/review-ui/reviews-breakdown';
import Container from '@/components/ui/container';
import { usePublic } from '@/lib/contexts/public-context';

export default function ReviewsContent() {
    const { reviews, business } = usePublic();

    if (!business || !reviews || reviews.length === 0) return <EmptyData>No reviews found</EmptyData>;
    return (
        <div className="flex flex-col bg-background ">
            <NavbarLivePage />
            <div className="py-4 md:py-6">
                <Container>
                    <div className="flex flex-col md:gap-6 gap-4">
                        <BusinessHeader
                            url={'/page/' + business.slug}
                            name={business.name}
                            logo_url={business.logo_url}
                            types={business.types}
                            description=""
                        />
                        <ReviewsBreakdown reviews={reviews ?? []} />
                        <DashboardCard title="Reviews" description="See what customers have to say about this business">
                            <ReviewList reviews={reviews ?? []} isPublic={true} />
                        </DashboardCard>
                    </div>
                </Container>
            </div>
        </div>
    );
}
