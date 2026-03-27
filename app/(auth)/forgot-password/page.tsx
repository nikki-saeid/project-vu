'use client';

import Logo from '@/components/logo';
import StyledIcon from '@/components/styled-icon';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { BASE_URL } from '@/lib/constants/urls';
import { createClient } from '@/lib/supabase/client';
import { forgotPasswordSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCheck, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ForgotPasswordForm() {
    // State to track loading and success status
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Initialize the form with react-hook-form and zod validation
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    // Handle form submission
    async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
        const supabase = createClient();
        setIsLoading(true);
        toast.loading('Sending password reset email...');

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: `${BASE_URL}/update-password`,
            });
            if (error) throw error;
            toast.dismiss();
            toast.success('Successfully sent password reset email.');
            setSuccess(true);
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while sending password reset email.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <Logo />
            {success ? (
                <Card className="self-stretch shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <StyledIcon IconProps={{ className: 'text-success' }} className="bg-success/5" Icon={IconCheck} />
                            <H3 className="text-primary">Check Your Email</H3>
                        </CardTitle>
                        <CardDescription>
                            If you registered using your email and password, you will receive a password reset email.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <P>
                            We have sent you an email with instructions to reset your password. Please check your inbox and follow the
                            instructions to create a new password for your account.
                        </P>
                    </CardContent>
                </Card>
            ) : (
                <Card className="self-stretch shadow-none">
                    <CardHeader>
                        <CardTitle>
                            <H3 className="text-primary">Reset Your Password</H3>
                        </CardTitle>
                        <CardDescription>Type in your email and we&apos;ll send you a link to reset your password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-email">Email</FieldLabel>
                                            <InputGroup>
                                                <InputGroupAddon>
                                                    <IconMail />
                                                </InputGroupAddon>
                                                <InputGroupInput
                                                    {...field}
                                                    id="form-email"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="m@example.com"
                                                    autoComplete="on"
                                                />
                                            </InputGroup>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Sending reset email...' : 'Send reset email'}
                                </Button>
                            </FieldGroup>
                        </form>
                        <div className="mt-6">
                            <P className="text-center text-sm">
                                Go back to{' '}
                                <Link href="/login" className="underline underline-offset-2">
                                    Sign in
                                </Link>
                            </P>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
