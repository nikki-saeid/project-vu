import { Review } from '@/lib/types/db';
import ReviewCard from './review-card';
import ReviewAction from './review-action';

type ReviewListProps = {
    reviews: Review[];
    isPublic: boolean;
};

export default function ReviewList({ reviews, isPublic = false }: ReviewListProps) {
    return (
        <div className="flex flex-col gap-4">
            {reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    name={review.name}
                    rate={review.rate}
                    comment={review.comment}
                    summary={review.summary}
                    action={isPublic ? undefined : <ReviewAction review={review} />}
                />
            ))}
        </div>
    );
}
