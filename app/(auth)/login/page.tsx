'use client';

import Logo from '@/components/logo';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useUser } from '@/lib/contexts/user-context';
import { roleRedirect } from '@/lib/helpers/role-redirect';
import { createClient } from '@/lib/supabase/client';
import { loginSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import PasswordInput from '../../../components/auth-ui/password-input';

export default function LoginForm() {
    // State to track loading status
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useUser();

    // Initialize the form with react-hook-form and zod validation
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Handle form submission
    async function onSubmit(formData: z.infer<typeof loginSchema>) {
        // Set loading state and show a toast notification
        setIsLoading(true);
        toast.loading('Logging in...');

        try {
            // Attempt to log in the user with Supabase
            const supabase = createClient();

            // Use signInWithPassword for email/password authentication
            const {
                error,
                data: { user },
            } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
            if (error) throw error;

            setUser(user);

            // Dismiss the loading toast and show success message
            toast.dismiss();
            toast.success('Successfully logged in.');

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
        <div className="flex flex-col gap-4 items-center">
            <Logo />
            <Card className="self-stretch shadow-none">
                <CardHeader>
                    <CardTitle>
                        <H3 className="text-primary">Welcome back</H3>
                    </CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
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

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-password">
                                            Password
                                            <Link
                                                href="/forgot-password"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </FieldLabel>
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
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </FieldGroup>
                    </form>
                    <div className="mt-6 flex flex-col gap-6">
                        <P className="text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" className="underline underline-offset-2">
                                Sign up
                            </Link>
                        </P>

                        {/* <div className="flex items-center gap-2 w-full">
                            <Separator className="flex-1" />
                            <P className="text-center text-xs text-muted-foreground">Or</P>
                            <Separator className="flex-1" />
                        </div>

                        <GoogleButton className="flex-1" /> */}
                    </div>
                </CardContent>

                <CardFooter className="border-t">
                    <P className="text-center text-muted-foreground text-xs w-full">
                        By logging in, you agree to our{' '}
                        <Link target="_blank" href="/terms-and-conditions" className="underline underline-offset-2">
                            Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link target="_blank" href="/privacy-policy" className="underline underline-offset-2">
                            Privacy Policy
                        </Link>
                        .
                    </P>
                </CardFooter>
            </Card>
        </div>
    );
}
