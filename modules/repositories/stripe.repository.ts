import { createsStripeServer } from '@/lib/stripe/server';

type CheckoutSessionMetadata = {
    businessId: string;
};

export const stripeRepository = {
    // get stripe
    checkoutSession: async function (priceId: string, metadata: CheckoutSessionMetadata, quantity = 1) {
        const stripe = await createsStripeServer();
        return await stripe.checkout.sessions.create({
            mode: 'subscription',
            ui_mode: 'embedded_page',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity,
                },
            ],
            subscription_data: {
                metadata,
            },
            // return_url: `${process.env.NEXT_PUBLIC_BASE_URL}?session_id={CHECKOUT_SESSION_ID}`,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/live-page`,
        });
    },

    checkoutSessionMonthly: async function (metadata: CheckoutSessionMetadata) {
        return await this.checkoutSession(process.env.STRIPE_MONTHLY_PRICE_ID!, metadata, 1);
    },

    checkoutSession6Monthly: async function (metadata: CheckoutSessionMetadata) {
        return await this.checkoutSession(process.env.STRIPE_6_MONTHLY_PRICE_ID!, metadata, 6);
    },

    checkoutSessionYearly: async function (metadata: CheckoutSessionMetadata) {
        return await this.checkoutSession(process.env.STRIPE_YEARLY_PRICE_ID!, metadata, 12);
    },

    getSubscriptionById: async function (subscriptionId: string) {
        const stripe = await createsStripeServer();
        return await stripe.subscriptions.retrieve(subscriptionId);
    },

    webhook: async function (requestBuffer: string, stripeSignature: string) {
        const stripe = await createsStripeServer();
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

        return stripe.webhooks.constructEvent(requestBuffer, stripeSignature, webhookSecret);
    },
};
