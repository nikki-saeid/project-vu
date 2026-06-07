import { Progress } from '@/components/ui/progress';
import { getAverageRating } from '@/lib/helpers/other';
import { Review } from '@/lib/types/db';
import { IconStarFilled } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';
import DashboardCard from '../dashboard-ui/dashboard-card';
import H2 from '../typography/H2';

type ReviewsBreakdownProps = {
    reviews: Review[];
};

export default function ReviewsBreakdown({ reviews }: ReviewsBreakdownProps) {
    if (reviews.length === 0) return null;

    const breakdown = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
        if (review.rate) {
            breakdown[review.rate - 1] += 1;
        }
    });

    const percentages = breakdown.map((count) => (reviews.length > 0 ? (count / reviews.length) * 100 : 0)).toReversed();

    const { averageRating } = getAverageRating(reviews);

    return (
        <DashboardCard
            title={
                <div className="flex items-center gap-1">
                    <IconStarFilled className="size-7 text-yellow-500" />
                    <H2>{averageRating.toFixed(2)}</H2>
                </div>
            }
            description="See the distribution of ratings for this business"
        >
            <div className="grid md:grid-cols-12 grid-cols-9 gap-2 items-center md:w-1/2">
                {breakdown.toReversed().map((count, index) => {
                    return (
                        <Fragment key={index}>
                            <div className="flex items-center gap-0.5">
                                <IconStarFilled className="size-3.5 text-yellow-500" />
                                <div className="text-sm text-muted-foreground">{5 - index}</div>
                            </div>
                            <div className="md:col-span-10 col-span-7">
                                <Progress className=" w-full" value={percentages[index]} />
                            </div>
                            <div className="text-sm ">{count}</div>
                        </Fragment>
                    );
                })}
            </div>
        </DashboardCard>
    );
}
