'use client';

import { Button } from '@/components/ui/button';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';
import { toast } from 'sonner';
import CheckoutDetails from './checkout-details';
import Loader from '@/components/loader';

export default function CheckoutForm() {
    const checkoutState = useCheckout();

    // in case of error, show toast
    if (checkoutState.type === 'error') {
        toast.error(checkoutState.error.message);
        return null;
    } else if (checkoutState.type === 'loading') {
        return <Loader />;
    }

    return (
        <form className="CheckoutForm">
            <div className="flex flex-col gap-4 max-w-sm m-auto">
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

                <Button type="submit">Pay now</Button>
            </div>
        </form>
    );
}
