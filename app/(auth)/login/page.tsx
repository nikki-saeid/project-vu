'use client';

import Logo from '@/components/logo';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import GoogleButton from '../../../components/auth-ui/google-button';
import PasswordInput from '../_components/password-input';
import { IconMail } from '@tabler/icons-react';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const supabase = createClient();
        setIsLoading(true);
        toast.loading('Logging in...');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            if (error) throw error;

            
            toast.dismiss();
            toast.success('Successfully logged in.');
            router.push('/protected');
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
                        By logging in, you agree to our{' '}
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
