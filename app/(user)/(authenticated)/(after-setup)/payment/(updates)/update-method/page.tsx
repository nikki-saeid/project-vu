'use client';

import BackButton from '@/components/back-button';
import CardLayouts from '@/components/card-layouts';
import UpdatePaymentMethodForm from '@/components/subscription-ui/update-payment-form';
import { getUpdatePaymentMethodCheckoutSession } from '@/lib/api-fetcher/stripe/client';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import { stripeClient } from '@/lib/stripe/client';
import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout';
import { useEffect, useState } from 'react';

export default function Page() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const { subscription } = useDashboard();

    useEffect(() => {
        if (subscription?.stripe_customer_id) {
            getUpdatePaymentMethodCheckoutSession(subscription?.stripe_customer_id).then((session) => {
                setClientSecret(session?.client_secret ?? null);
            });
        }
    }, [subscription]);

    return (
        <CardLayouts action={<BackButton isIcon={false} />}>
            <div className="min-h-100 flex justify-center items-center">
                {clientSecret && stripeClient && (
                    <CheckoutElementsProvider stripe={stripeClient} options={{ clientSecret }}>
                        <UpdatePaymentMethodForm />
                    </CheckoutElementsProvider>
                )}
            </div>
        </CardLayouts>
    );
}
