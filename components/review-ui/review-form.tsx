'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { updatepublicReviewById } from '@/lib/api-fetcher/user/client/review';
import { ReviewFormProps } from '@/lib/types/forms';
import { cn } from '@/lib/utils/classes-merge';
import { reviewSchema } from '@/lib/validators/user/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconStarFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export type ReviewInput = z.infer<typeof reviewSchema>;

export default function ReviewForm({ id, setIsLoading, onSuccess }: ReviewFormProps) {
    const [hoveredRating, setHoveredRating] = useState(0);

    const form = useForm<ReviewInput>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rate: 0,
            summary: '',
            comment: '',
        },
    });

    const onSubmit = async (data: ReviewInput) => {
        setIsLoading(true);
        try {
            const response = await updatepublicReviewById(JSON.stringify(data), id);
            toast.success(response.message);

            form.reset();
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to send review request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-4 md:gap-6')}>
            {/* Rating */}
            <Controller
                name="rate"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Overall Rating</FieldLabel>

                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const active = hoveredRating ? star <= hoveredRating : star <= field.value;

                                return (
                                    <button
                                        type="button"
                                        key={star}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        onClick={() => field.onChange(star)}
                                        className="transition-transform hover:scale-110"
                                    >
                                        <IconStarFilled
                                            className={cn(
                                                'size-8 transition-colors',
                                                active ? 'text-yellow-400' : 'text-muted-foreground/30',
                                            )}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Summary */}
            <Controller
                name="summary"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="review-summary">Summary</FieldLabel>

                        <InputGroup>
                            <InputGroupInput
                                {...field}
                                id="review-summary"
                                aria-invalid={fieldState.invalid}
                                placeholder="Summarize your experience"
                                autoComplete="off"
                            />
                        </InputGroup>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Comment */}
            <Controller
                name="comment"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="review-comment">Comment</FieldLabel>

                        <InputGroup>
                            <InputGroupTextarea
                                {...field}
                                id="review-comment"
                                aria-invalid={fieldState.invalid}
                                placeholder="Share your experience"
                                autoComplete="off"
                                rows={5}
                            />
                        </InputGroup>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </form>
    );
}
