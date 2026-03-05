import { BUSINESS_TYPE } from '@/lib/constants/user-dashboard';
import z from 'zod';

export const onboardingProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(10, 'Bio is required'),
    type: z.enum(BUSINESS_TYPE),
    phone: z.string().min(1, 'Name is required'),
    instagram_url: z.string().url().optional(),
    facebook_url: z.string().url().optional(),
    website_url: z.string().url().optional(),
});
