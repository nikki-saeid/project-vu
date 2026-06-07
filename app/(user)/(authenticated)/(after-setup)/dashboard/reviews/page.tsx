'use client';

import DashboardCard from '@/components/dashboard-ui/dashboard-card';
import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';
import NoReview from '@/components/review-ui/no-review';
import ReviewList from '@/components/review-ui/review-list';
import RequestReviewDialog from '@/components/review-ui/review-request-dialog';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import ReviewsSentTable from './_components/reviews-sent-table';
import P from '@/components/typography/P';
import ReviewsBreakdown from '@/components/review-ui/reviews-breakdown';

export default function Page() {
    const { reviews } = useDashboard();

    const reviewsSent = reviews ? reviews.filter((review) => review.status === 'sent') : [];
    const reviewsDone = reviews ? reviews.filter((review) => review.status === 'done') : [];

    return (
        <div>
            <DashboardSubNavbar>
                <div></div>
                <RequestReviewDialog />
            </DashboardSubNavbar>

            <div className="flex flex-col md:gap-6 gap-4 p-4 md:p-6">
                <P className="text-muted-foreground">Manage and request reviews from your clients and see their feedback here.</P>
                {(!reviews || reviews.length === 0) && <NoReview />}
                {reviewsSent.length > 0 && (
                    <DashboardCard title="Reviews requested" description="Reviews sent to clients and waiting for approval">
                        <ReviewsSentTable reviews={reviewsSent} />
                    </DashboardCard>
                )}
                {reviews && reviews.length > 0 && <ReviewsBreakdown reviews={reviews} />}

                {reviewsDone.length > 0 && (
                    <DashboardCard title="Reviews list" description="This list will be shown in your live page.">
                        <ReviewList reviews={reviewsDone} isPublic={false} />
                    </DashboardCard>
                )}
            </div>
        </div>
    );
}
