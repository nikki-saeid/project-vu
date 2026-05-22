import { Review } from '@/lib/types/db';
import ReviewCard from './review-card';

type ReviewListProps = {
    reviews: Review[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
    return (
        <div className="flex flex-col gap-4">
            {reviews.map((review) => (
                <ReviewCard key={review.id} name={review.name} rate={review.rate} comment={review.comment} summary={review.summary} />
            ))}
        </div>
    );
}
