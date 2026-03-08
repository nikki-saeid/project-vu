import z from 'zod';

export const projectCreateSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    description: z.string().min(1, 'Description is required').max(5000, 'Description must be less than 5000 characters'),
    address: z.string().min(1, 'Address is required').max(500, 'Address must be less than 500 characters'),
    latitude: z.number({ required_error: 'Latitude is required' }).min(-90).max(90),
    longitude: z.number({ required_error: 'Longitude is required' }).min(-180).max(180),
    isImagesUploaded: z.boolean({ required_error: 'Images are required' }).refine((val) => val, { message: 'Images are required' }),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
