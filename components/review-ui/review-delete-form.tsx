'use client';

import { useDashboard } from '@/lib/contexts/dashboard-context';
import type { ReviewDeleteFormProps } from '@/lib/types/forms';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import P from '../typography/P';
import { deleteReviewById } from '@/lib/api-fetcher/user/client/review';

export default function ReviewDeleteForm({ onSuccess, id, setIsLoading }: ReviewDeleteFormProps) {
    const { reviews, setReviews } = useDashboard();
    const form = useForm({});

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const deletedReview = await deleteReviewById(id);
            toast.success(deletedReview.message);
            onSuccess?.();
            setReviews(reviews ? reviews.filter((review) => review.id !== id) : []);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while deleting your project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <P className="text-destructive">Are you sure you want to delete this review?</P>
        </form>
    );
}
