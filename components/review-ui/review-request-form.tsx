'use client';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { createReviewRequest } from '@/lib/api-fetcher/user/client/review';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { ReviewRequestFormProps } from '@/lib/types/forms';
import { cn } from '@/lib/utils/classes-merge';
import { reviewRequestSchema } from '@/lib/validators/user/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconMail, IconMessage2, IconUser } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export type ReviewRequestInput = z.infer<typeof reviewRequestSchema>;

export default function ReviewRequestForm({ onSuccess, setIsLoading, id }: ReviewRequestFormProps) {
    const { setReviews, reviews } = useDashboard();

    const form = useForm<ReviewRequestInput>({
        resolver: zodResolver(reviewRequestSchema),
        defaultValues: {
            name: '',
            email: '',
            request_comment: '',
        },
    });

    const onSubmit = async (data: ReviewRequestInput) => {
        try {
            setIsLoading(true);

            const response = await createReviewRequest(JSON.stringify(data));
            toast.success(response.message);

            if (response.data) {
                setReviews([response.data, ...(reviews ?? [])]);
            }

            form.reset();
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to send review request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} className={cn('flex flex-col gap-4 md:gap-6')} onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-client-name">Client name</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <IconUser />
                            </InputGroupAddon>
                            <InputGroupInput
                                {...field}
                                id="form-client-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter the client's name"
                                autoComplete="on"
                            />
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="review-request-email">Client email</FieldLabel>

                        <InputGroup>
                            <InputGroupAddon>
                                <IconMail className="size-4" />
                            </InputGroupAddon>

                            <InputGroupInput
                                {...field}
                                id="review-request-email"
                                type="email"
                                placeholder="client@email.com"
                                autoComplete="off"
                                aria-invalid={fieldState.invalid}
                            />
                        </InputGroup>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="request_comment"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="review-request-comment">
                            Request Comment{' '}
                            <i>
                                <b>(optional)</b>
                            </i>
                        </FieldLabel>

                        <FieldDescription>Add a short personalized message.</FieldDescription>

                        <InputGroup>
                            <InputGroupTextarea
                                {...field}
                                id="review-request-comment"
                                placeholder="Would love your feedback on the project..."
                                autoComplete="off"
                                aria-invalid={fieldState.invalid}
                            />

                            <InputGroupAddon>
                                <IconMessage2 className="size-4" />
                            </InputGroupAddon>
                        </InputGroup>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </form>
    );
}
