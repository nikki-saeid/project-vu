'use client';

import Logo from '@/components/logo';
import StyledIcon from '@/components/styled-icon';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useUser } from '@/lib/contexts/user-context';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCheck } from '@tabler/icons-react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits long.'),
});

export default function SignUpSuccess() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') ?? '';
    const { setUser } = useUser();

    if (!email) {
        redirect('/sign-up');
    }

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        toast.loading('Verifying...');

        try {
            const supabase = await createClient();
            const {
                error,
                data: { user },
            } = await supabase.auth.verifyOtp({
                email: email,
                token: data.otp,
                type: 'signup',
            });
            if (error) throw error;
            setUser(user);

            toast.dismiss();
            toast.success('Successfully verified.');

            router.push('/dashboard/onboarding/business-profile');
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while verifying.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <Logo />
            <Card className="self-stretch shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <StyledIcon IconProps={{ className: 'text-success' }} className="bg-success/5" Icon={IconCheck} />
                        <H3 className="text-primary">Thank you for signing up!</H3>
                    </CardTitle>
                    <CardDescription>
                        <P>You&apos;ve successfully signed up. Please check your email to confirm your account before signing in.</P>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="otp"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-otp">Verification Code</FieldLabel>
                                        <InputOTP
                                            id="form-otp"
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                            maxLength={6}
                                            pattern={REGEXP_ONLY_DIGITS}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify'}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
