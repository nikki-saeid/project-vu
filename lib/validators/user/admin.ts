import z from 'zod';

export const priceCreateSchema = z.object({
    // Stripe price
    active: z.boolean(),
    unit_amount: z.coerce.number().min(0),
    interval: z.enum(['month', 'year', 'week', 'day']),
    interval_count: z.coerce.number().min(1, 'Interval count is required'),

    // Product
    saving: z.coerce.number().optional(),
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Product description is required'),
    benefits: z
        .array(
            z.object({
                value: z.string(),
            }),
        )
        .min(1, 'Product benefits are required'),
});

export type PriceCreateInput = z.infer<typeof priceCreateSchema>;
