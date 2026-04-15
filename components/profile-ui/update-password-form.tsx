'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useUser } from '@/lib/contexts/user-context';
import { createClient } from '@/lib/supabase/client';
import { updatePasswordSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import PasswordInput from '../auth-ui/password-input';

type UpdatePasswordFormProps = {
    id: string;
    setIsLoading: (v: boolean) => void;
    onSuccess?: () => void;
};

export default function UpdatePasswordForm({ id, setIsLoading, onSuccess }: UpdatePasswordFormProps) {
    const { setUser } = useUser();
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
            const {
                error,
                data: { user },
            } = await supabase.auth.updateUser({
                password: data.password,
            });

            // Handle any errors that occur during password update
            if (error) throw error;
            setUser(user);

            // Dismiss the loading toast and show success message
            toast.dismiss();
            toast.success('Successfully updated password.');

            onSuccess?.();
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while logging in.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
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
            </FieldGroup>
        </form>
    );
}
