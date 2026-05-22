import z from 'zod';

export const reviewRequestSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    request_comment: z.string().max(500, 'Comment is too long').optional(),
});

export const reviewSchema = z.object({
    rate: z.number().min(1, 'Please select a rating').max(5),
    summary: z.string().min(2, 'Summary is required'),
    comment: z.string().min(5, 'Comment is required'),
});
