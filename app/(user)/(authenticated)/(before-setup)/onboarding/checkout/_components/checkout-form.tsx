'use client';

import Loader from '@/components/loader-ui/loader';
import { Button } from '@/components/ui/button';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';
import { useState } from 'react';
import { toast } from 'sonner';
import CheckoutDetails from './checkout-details';
import AbsoluteLoader from '@/components/loader-ui/absolute-loader';

export default function CheckoutForm() {
    const checkoutState = useCheckout();
    const [isLoading, setIsLoading] = useState(false);

    // in case of error, show toast
    if (checkoutState.type === 'error') {
        toast.error(checkoutState.error.message);
        return null;
    } else if (checkoutState.type === 'loading') {
        return <Loader />;
    }

    // ----------
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            if (checkoutState.type !== 'success') return;

            const result = await checkoutState.checkout.confirm();

            if (result.type === 'error') {
                toast.error(result.error.message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred while confirming the payment');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 max-w-sm m-auto relative">
                {isLoading && <AbsoluteLoader />}

                <CheckoutDetails details={checkoutState.checkout.lineItems[0]} />

                <PaymentElement
                    options={{
                        wallets: {
                            applePay: 'auto',
                            googlePay: 'auto',
                        },
                        terms: {
                            card: 'always',
                            applePay: 'always',
                            googlePay: 'always',
                        },
                        fields: {
                            billingDetails: 'auto',
                        },
                    }}
                />

                <Button disabled={isLoading} type="submit">
                    {isLoading ? 'Processing...' : 'Pay now'}
                </Button>
            </div>
        </form>
    );
}
