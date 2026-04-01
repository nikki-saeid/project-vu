'use client';

import CardLayouts from '@/components/card-layouts';
import { Button } from '@/components/ui/button';
import { getCheckoutSession } from '@/lib/api-fetcher/stripe/client';
import { stripeClient } from '@/lib/stripe/client';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import Link from 'next/link';

type CheckoutContentProps = {
    plan: string;
};

export default function CheckoutContent({ plan }: CheckoutContentProps) {
    const fetchClientSecret = async () => {
        const session = await getCheckoutSession(plan);

        return session?.client_secret ?? '';
    };

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
            <div className="min-h-270">
                <EmbeddedCheckoutProvider stripe={stripeClient} options={{ fetchClientSecret }}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </div>
        </CardLayouts>
    );
}
