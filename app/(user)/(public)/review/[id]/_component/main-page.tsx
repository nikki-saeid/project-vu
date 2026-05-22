'use client';
import CardForm from '@/components/card-form';
import ReviewForm from '@/components/review-ui/review-form';
import { Button } from '@/components/ui/button';
import { Review } from '@/lib/types/db';
import { useRouter } from 'next/navigation';

type MainPageProps = { review: Review };

export default function MainPage({ review }: MainPageProps) {
    const router = useRouter();
    const handleDone = () => {
        router.push('/');
        window.location.reload();
    };

    return (
        <CardForm
            action={(id, isLoading) => (
                <Button size="sm" type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Submitting review...' : 'Submit review'}
                </Button>
            )}
            id={review.id}
            form={(id, setIsLoading) => <ReviewForm id={id} setIsLoading={setIsLoading} onSuccess={handleDone} />}
            title="Leave a review"
            description="Your feedback helps us improve and also helps other customers choose with confidence."
        />
    );
}
