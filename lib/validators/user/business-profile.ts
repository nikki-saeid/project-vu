import z from 'zod';

export const businessProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    types: z
        .array(z.string().min(1, 'Type is required'))
        .max(5, 'You can select up to 5 types')
        .min(1, 'You must select at least one type'),
    service_type_tags: z.array(z.string().min(1, 'Service type tags are required')).max(5, 'You can select up to 5 service type tags'),
    project_type_tags: z.array(z.string().min(1, 'Project type tags are required')).max(5, 'You can select up to 5 project type tags'),
    description: z.string().min(10, 'Bio is required').max(2000, 'Bio must be less than 2000 characters'),
    phone: z.string().min(1, 'Phone is required'),
    website_url: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
    instagram_url: z.string().url('Please enter a valid Instagram URL').optional().or(z.literal('')),
    facebook_url: z.string().url('Please enter a valid Facebook URL').optional().or(z.literal('')),
    x_url: z.string().url('Please enter a valid X URL').optional().or(z.literal('')),
    google_map_url: z.string().url('Please enter a valid Google review URL').optional().or(z.literal('')),
});

export const businessDeleteSchema = z.object({
    confirm: z
        .string()
        .min(1, 'Type DELETE to confirm.')
        .refine((value) => value.toUpperCase() === 'DELETE', {
            message: 'Type DELETE to confirm.',
        }),
});
