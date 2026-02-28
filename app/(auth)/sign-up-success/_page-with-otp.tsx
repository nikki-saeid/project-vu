'use client';

import Logo from '@/components/logo';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    otp: z.string().length(8, 'OTP must be 8 digits long.'),
});

export default function SignUpSuccess() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: '',
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const supabase = createClient();
        setIsLoading(true);
        toast.loading('Verifying...');

        console.log((await supabase.auth.getSession()).data.session?.user.email);
        

        try {
            const { error } = await supabase.auth.verifyOtp({
                email: (await supabase.auth.getSession()).data.session?.user.email ?? '',
                token: data.otp,
                type: 'signup',
            });
            if (error) throw error;
            toast.dismiss();
            toast.success('Successfully verified.');
            router.push('/protected');
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while verifying.');
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
                        <H3 className="text-primary">Thank you for signing up!</H3>
                    </CardTitle>
                    <CardDescription>Check your email to confirm</CardDescription>
                </CardHeader>
                <CardContent>
                    <P>You&apos;ve successfully signed up. Please check your email to confirm your account before signing in.</P>

                    <div className="my-6 flex items-center gap-2 w-full">
                        <Separator className="flex-1" />
                        <P className="text-center text-xs text-muted-foreground">Or</P>
                        <Separator className="flex-1" />
                    </div>

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
                                            maxLength={8}
                                            pattern={REGEXP_ONLY_DIGITS}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                                <InputOTPSlot index={6} />
                                                <InputOTPSlot index={7} />
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
