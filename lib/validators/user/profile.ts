import z from 'zod';

export const profileSchema = z.object({
    full_name: z.string().min(1, 'Full name is required'),
});
