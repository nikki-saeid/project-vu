import { BUSINESS_TYPE } from '@/lib/constants/user-dashboard';
import z from 'zod';

export const businessProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.enum(BUSINESS_TYPE, {
        message: 'Please select a business type',
    }),
    description: z.string().min(10, 'Bio is required').max(200, 'Bio must be less than 200 characters'),
    phone: z.string().min(1, 'Phone is required'),
    website_url: z.string().url('Please enter a valid website URL').optional(),
    instagram_url: z.string().url('Please enter a valid Instagram URL').optional(),
    facebook_url: z.string().url('Please enter a valid Facebook URL').optional(),
    x_url: z.string().url('Please enter a valid X URL').optional(),
});
