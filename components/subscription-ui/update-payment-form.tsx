'use client';

import AbsoluteLoader from '@/components/loader-ui/absolute-loader';
import Loader from '@/components/loader-ui/loader';
import { Button } from '@/components/ui/button';
import { useCheckout } from '@stripe/react-stripe-js/checkout';
import { useState } from 'react';
import { toast } from 'sonner';
import PaymentCardsList from './payment-cards-list';

export default function UpdatePaymentMethodForm() {
    const checkoutState = useCheckout();

    const [isLoading, setIsLoading] = useState(false);

    // handle checkout state errors
    if (checkoutState.type === 'error') {
        toast.error(checkoutState.error.message);

        return null;
    }

    // loading checkout session
    if (checkoutState.type === 'loading') {
        return <Loader />;
    }

    // update payment method
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            if (checkoutState.type !== 'success') {
                return;
            }

            const result = await checkoutState.checkout.confirm();

            if (result.type === 'error') {
                toast.error(result.error.message);

                return;
            }

            toast.success('Payment method updated successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to update payment method');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative flex flex-col gap-4 max-w-sm m-auto">
                {isLoading && <AbsoluteLoader />}

                <div className="space-y-1">
                    <h2 className="text-lg font-semibold">Update payment method</h2>

                    <p className="text-sm text-muted-foreground">
                        Your new card will become the default payment method for future invoices.
                    </p>
                </div>

                <PaymentCardsList />

                <Button disabled={isLoading} type="submit">
                    {isLoading ? 'Updating...' : 'Update payment method'}
                </Button>
            </div>
        </form>
    );
}
