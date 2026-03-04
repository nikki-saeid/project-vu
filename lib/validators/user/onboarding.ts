import z from 'zod';

export const onboardingProfileSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    image_url: z.string().url().optional(),
});
