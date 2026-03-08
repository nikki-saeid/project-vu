'use client';

import Logo from '@/components/logo';
import H3 from '@/components/typography/H3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { createClient } from '@/lib/supabase/client';
import { updatePasswordSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import PasswordInput from '../../../components/auth-ui/password-input';
import { roleRedirect } from '@/lib/helpers/role-redirect';

export default function UpdatePasswordForm() {
    // Define the form schema using zod
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Define the form schema using zod
    const form = useForm({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: '',
            repeatPassword: '',
        },
    });

    // Handle form submission
    async function onSubmit(data: z.infer<typeof updatePasswordSchema>) {
        // Set loading state and show a toast notification
        setIsLoading(true);
        toast.loading('Updating password...');

        try {
            // Attempt to update the user's password with Supabase
            const supabase = createClient();

            // Use updateUser to change the password
            const { error } = await supabase.auth.updateUser({
                password: data.password,
            });

            // Handle any errors that occur during password update
            if (error) throw error;

            // Dismiss the loading toast and show success message
            toast.dismiss();
            toast.success('Successfully updated password.');

            // Redirect the user based on their role
            const redirectUrl = await roleRedirect();
            router.push(redirectUrl);
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while logging in.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Logo className="mx-auto mb-6" />
            <Card>
                <CardHeader>
                    <CardTitle>
                        <H3 className="text-primary">Reset Your Password</H3>
                    </CardTitle>
                    <CardDescription>Please enter your new password below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-password">New password</FieldLabel>
                                        <PasswordInput
                                            {...field}
                                            id="form-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your new password"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="repeatPassword"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-repeat-password">Repeat new password</FieldLabel>
                                        <PasswordInput
                                            {...field}
                                            id="form-repeat-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your new password again"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Updating password...' : 'Update password'}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
