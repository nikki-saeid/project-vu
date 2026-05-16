import { PaymentElement } from '@stripe/react-stripe-js/checkout';

export default function PaymentCardsList() {
    return (
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
    );
}
