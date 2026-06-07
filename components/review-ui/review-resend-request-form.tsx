'use clien';

import type { BusinessDeleteFormProps } from '@/lib/types/forms';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import P from '../typography/P';
import { resendReviewById } from '@/lib/api-fetcher/user/client/review';

export default function ReviewResendRequestForm({ onSuccess, id, setIsLoading }: BusinessDeleteFormProps) {
    const form = useForm({});

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const sendReviewRequest = await resendReviewById(id);
            toast.success(sendReviewRequest.message);
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while resending the request email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-4 md:gap-6" id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <P>Are you sure you want to resend the request email?</P>
        </form>
    );
}
