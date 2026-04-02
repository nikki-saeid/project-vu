import z from 'zod';

export const subscriptionCancelSchema = z.object({
    confirm: z
        .string()
        .min(1, 'Type CANCEL to confirm.')
        .refine((value) => value.toUpperCase() === 'CANCEL', {
            message: 'Type CANCEL to confirm.',
        }),
});
