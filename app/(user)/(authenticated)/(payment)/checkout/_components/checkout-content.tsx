'use client';

import CardLayouts from '@/components/card-layouts';
import { Button } from '@/components/ui/button';
import { getCheckoutSession } from '@/lib/api-fetcher/stripe/client';
import { stripeClient } from '@/lib/stripe/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CheckoutForm from './checkout-form';
import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout';

type CheckoutContentProps = {
    plan: string;
};

export default function CheckoutContent({ plan }: CheckoutContentProps) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        getCheckoutSession(plan).then((session) => {
            setClientSecret(session?.client_secret ?? null);
        });
    }, [plan]);

    return (
        <CardLayouts
            action={
                <div className="flex justify-between w-full">
                    <Link href={`/onboarding/subscription-plan?plan=${plan}`}>
                        <Button size="sm" variant="outline" type="submit">
                            Back
                        </Button>
                    </Link>
                </div>
            }
        >
            <div className="min-h-100 flex justify-center items-center">
                {clientSecret && stripeClient && (
                    <CheckoutElementsProvider stripe={stripeClient} options={{ clientSecret }}>
                        <CheckoutForm />
                    </CheckoutElementsProvider>
                )}
            </div>
        </CardLayouts>
    );
}
