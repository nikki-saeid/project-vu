'use client';

import { resumeSubscription } from '@/lib/api-fetcher/stripe/client';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import type { BusinessDeleteFormProps } from '@/lib/types/forms';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, FieldLabel } from '../ui/field';

export default function SubscriptionResumeForm({ onSuccess, id, setIsLoading }: BusinessDeleteFormProps) {
    const { subscription } = useDashboard();
    const form = useForm();

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await resumeSubscription(subscription?.stripe_subscription_id ?? '');
            toast.success(response.message);
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while deleting your account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-4 md:gap-6" id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <Field>
                <FieldLabel>Your subscription will resume after the next billing cylce.</FieldLabel>
                {/* <FieldDescription>This helps prevent accidental cancellation.</FieldDescription> */}
            </Field>
        </form>
    );
}
