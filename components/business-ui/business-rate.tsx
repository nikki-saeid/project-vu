import { getAverageRating } from '@/lib/helpers/other';
import { Review } from '@/lib/types/db';
import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react';
import Link from 'next/link';

type BusinessRateProps = {
    reviews: Review[];
    isPublic: boolean;
    slug: string;
};

export default function BusinessRate({ reviews, isPublic, slug }: BusinessRateProps) {
    if (!reviews || reviews.length === 0) return null;

    const { averageRating, mainStart, halfStart } = getAverageRating(reviews);

    return (
        <div className="flex items-center gap-1">
            <span className="font-semibold text-xs">{averageRating.toFixed(2)}</span>

            <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-yellow-500">
                        {i < mainStart ? (
                            <IconStarFilled className="size-3.5" />
                        ) : halfStart && i === mainStart ? (
                            <IconStarHalfFilled className="size-3.5" />
                        ) : (
                            <IconStar className="size-3.5" />
                        )}
                    </span>
                ))}
            </div>

            <span className="text-muted-foreground text-xs">
                <Link href={isPublic ? '/page/' + slug + '/reviews' : '/dashboard/reviews'} className="hover:underline">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </Link>
            </span>
        </div>
    );
}
