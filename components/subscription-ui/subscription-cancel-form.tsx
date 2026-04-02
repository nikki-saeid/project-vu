'use client';

import { cancelSubscription } from '@/lib/api-fetcher/stripe/client';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import type { BusinessDeleteFormProps } from '@/lib/types/forms';
import { subscriptionCancelSchema } from '@/lib/validators/user/subscription';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconVipOff } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import P from '../typography/P';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

export default function SubscriptionCancelForm({ onSuccess, id, setIsLoading }: BusinessDeleteFormProps) {
    const { subscription } = useDashboard();
    const form = useForm({
        resolver: zodResolver(subscriptionCancelSchema),
        defaultValues: {
            confirm: '',
        },
    });

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await cancelSubscription(subscription?.stripe_subscription_id ?? '');
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
            <Controller
                name="confirm"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <P className="text-destructive">
                            The cancellation will take affect after the next billing cycle. <br />
                        </P>
                        <P className="text-destructive">
                            Your business profile will be unpublished after the cancellation. <br />
                        </P>
                        <FieldLabel htmlFor="cancel-confirm">Type CANCEL to confirm</FieldLabel>
                        <FieldDescription>This helps prevent accidental cancellation.</FieldDescription>
                        <InputGroup>
                            <InputGroupInput
                                {...field}
                                id="cancel-confirm"
                                aria-invalid={fieldState.invalid}
                                placeholder="CANCEL"
                                autoComplete="on"
                            />
                            <InputGroupAddon>
                                <IconVipOff />
                            </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </form>
    );
}
