'use client';

import Logo from '@/components/logo';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Separator } from '@/components/ui/separator';
import { BASE_URL } from '@/lib/constants/urls';
import { createClient } from '@/lib/supabase/client';
import { signUpSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconMail, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import GoogleButton from '../../../components/auth-ui/google-button';
import PasswordInput from '../../../components/auth-ui/password-input';

export default function SignUpForm() {
    // State to track loading status
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Initialize the form with react-hook-form and zod validation
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            full_name: '',
            password: '',
            repeatPassword: '',
        },
    });

    // Handle form submission
    async function onSubmit(data: z.infer<typeof signUpSchema>) {
        // Set loading state and show a toast notification
        setIsLoading(true);
        toast.loading('Signing up...');

        try {
            // Attempt to sign up the user with Supabase
            const supabase = createClient();

            // Use signUp for email/password authentication
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    emailRedirectTo: `${BASE_URL}/protected`,
                    data: {
                        full_name: data.full_name,
                    },
                },
            });

            // Handle any errors that occur during sign-up
            if (error) throw error;

            // Dismiss the loading toast and show success message
            toast.dismiss();
            toast.success('Successfully signed up.');

            // Redirect the user to a success page or dashboard after successful sign-up
            router.push(`/sign-up-success?email=${data.email}`);
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while signing up.');
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
                        <H3 className="text-primary">Create an account</H3>
                    </CardTitle>
                    <CardDescription>Sign up to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="full_name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-full-name">Full name</FieldLabel>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <IconUser />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                {...field}
                                                id="form-full-name"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter your full name"
                                                autoComplete="on"
                                            />
                                        </InputGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
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
                            <div className="flex sm:flex-row flex-col items-center md:gap-6 gap-4">
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-password">Password</FieldLabel>
                                            <PasswordInput
                                                {...field}
                                                id="form-password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter your password"
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
                                            <FieldLabel htmlFor="form-repeat-password">Repeat Password</FieldLabel>
                                            <PasswordInput
                                                {...field}
                                                id="form-repeat-password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Repeat your password"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </FieldGroup>
                    </form>
                    <div className="mt-6 flex flex-col gap-6">
                        <P className="text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="underline underline-offset-2">
                                Login
                            </Link>
                        </P>

                        <div className="flex items-center gap-2 w-full">
                            <Separator className="flex-1" />
                            <P className="text-center text-xs text-muted-foreground">Or</P>
                            <Separator className="flex-1" />
                        </div>

                        <GoogleButton className="flex-1" />
                    </div>
                </CardContent>

                <CardFooter className="border-t">
                    <P className="text-center text-muted-foreground text-xs w-full">
                        By signing up, you agree to our{' '}
                        <Link href="/terms" className="underline underline-offset-2">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/terms" className="underline underline-offset-2">
                            Privacy Policy
                        </Link>
                        .
                    </P>
                </CardFooter>
            </Card>
        </div>
    );
}
