import { createsStripeServer } from '@/lib/stripe/server';
import { CheckoutSessionMetadata } from '@/lib/types/api';
import { lastDayOfMonth } from 'date-fns';
import Stripe from 'stripe';

export const stripeRepository = {
    webhook: async function (requestBuffer: string, stripeSignature: string) {
        const stripe = await createsStripeServer();
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

        return stripe.webhooks.constructEvent(requestBuffer, stripeSignature, webhookSecret);
    },
    checkoutSession: {
        get: async function (priceId: string, email: string, metadata: CheckoutSessionMetadata, quantity = 1) {
            const stripe = await createsStripeServer();
            return await stripe.checkout.sessions.create({
                mode: 'subscription',
                ui_mode: 'elements',
                customer_email: email,
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
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/live-page?payment=success`,
            });
        },
        updateByStripeCustomerId: async function (stripeCustomerId: string, metadata: CheckoutSessionMetadata) {
            const stripe = await createsStripeServer();
            return await stripe.checkout.sessions.create({
                mode: 'setup',
                ui_mode: 'elements',
                customer: stripeCustomerId,
                currency: 'aud',
                setup_intent_data: {
                    metadata,
                },
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/billing?card_updated=success`,
            });
        },
    },
    invoice: {
        getManyByStripeCustomerId: async function (stripeCustomerId: string, limit: number) {
            const stripe = await createsStripeServer();
            const invoices = await stripe.invoices.list({ customer: stripeCustomerId, limit });
            return invoices.data;
        },
    },
    balanceTransaction: {
        getManyByMonth: async function (month: number, limit: number, starting_after?: string) {
            const stripe = await createsStripeServer();

            const start = new Date(new Date().getFullYear(), month, 1);
            const end = lastDayOfMonth(start);

            return await stripe.balanceTransactions.list({
                limit,
                starting_after,
                created: {
                    gte: Math.floor(start.getTime() / 1000),
                    lte: Math.floor(end.getTime() / 1000),
                },
            });
        },

        getAllByMonth: async function (month: number) {
            const balanceTransactions: Stripe.BalanceTransaction[] = [];
            let starting_after = undefined;

            while (true) {
                const result = await this.getManyByMonth(month, 100, starting_after);
                balanceTransactions.push(...result.data);

                if (!result.has_more) break;

                starting_after = balanceTransactions[balanceTransactions.length - 1].id;
            }

            return balanceTransactions;
        },
    },
    subscription: {
        cancelById: async function (id: string) {
            const stripe = await createsStripeServer();
            return await stripe.subscriptions.update(id, {
                cancel_at_period_end: true,
            });
        },
        resumeById: async function (id: string) {
            const stripe = await createsStripeServer();
            return await stripe.subscriptions.update(id, {
                cancel_at_period_end: false,
            });
        },
    },
    paymentMethod: {
        getById: async function (id: string) {
            if (!id) return null;
            const stripe = await createsStripeServer();
            return await stripe.paymentMethods.retrieve(id);
        },
    },
    setupIntent: {
        getById: async function (id: string) {
            const stripe = await createsStripeServer();
            return await stripe.setupIntents.retrieve(id);
        },
    },
    customer: {
        updateById: async function (id: string, data: Stripe.CustomerUpdateParams) {
            const stripe = await createsStripeServer();
            return await stripe.customers.update(id, data);
        },
    },
    price: {
        getById: async function (id: string) {
            const stripe = await createsStripeServer();
            return await stripe.prices.retrieve(id);
        },
        getAll: async function () {
            const stripe = await createsStripeServer();
            return (
                await stripe.prices.list({
                    expand: ['data.product'],
                })
            ).data;
        },
        updateById: async function (id: string, data: Stripe.PriceUpdateParams) {
            const stripe = await createsStripeServer();
            return await stripe.prices.update(id, data);
        },
        create: async function (data: Stripe.PriceCreateParams) {
            const stripe = await createsStripeServer();
            return await stripe.prices.create(data);
        },
    },

    product: {
        create: async function (data: Stripe.ProductCreateParams) {
            const stripe = await createsStripeServer();
            return await stripe.products.create(data);
        },
        updateById: async function (id: string, data: Stripe.ProductUpdateParams) {
            const stripe = await createsStripeServer();
            return await stripe.products.update(id, data);
        },
    },
};
