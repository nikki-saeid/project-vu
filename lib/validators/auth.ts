import z from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export const signUpSchema = z
    .object({
        email: z.string().email({ message: 'Please enter a valid email address.' }),
        full_name: z.string().min(1, 'Please enter a valid name'),
        password: z.string().min(8, 'Password must be at least 8 characters long.'),
        repeatPassword: z.string().min(8, 'Password must be at least 8 characters long.'),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: 'Passwords do not match.',
        path: ['repeatPassword'],
    });

export const updatePasswordSchema = z
    .object({
        password: z.string().min(8, 'Password must be at least 8 characters long.'),
        repeatPassword: z.string().min(8, 'Password must be at least 8 characters long.'),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: 'Passwords do not match.',
        path: ['repeatPassword'],
    });

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
});
