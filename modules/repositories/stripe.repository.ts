import { createsStripeServer } from '@/lib/stripe/server';
import { lastDayOfMonth } from 'date-fns';
import Stripe from 'stripe';

type CheckoutSessionMetadata = {
    businessId: string;
    plan: string;
};

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
                ui_mode: 'embedded_page',
                payment_method_types: ['card'],
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
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/live-page`,
            });
        },

        getMonthly: async function (email: string, metadata: CheckoutSessionMetadata) {
            return await this.get(process.env.STRIPE_MONTHLY_PRICE_ID!, email, metadata, 1);
        },

        get6Monthly: async function (email: string, metadata: CheckoutSessionMetadata) {
            return await this.get(process.env.STRIPE_6_MONTHLY_PRICE_ID!, email, metadata, 6);
        },

        getYearly: async function (email: string, metadata: CheckoutSessionMetadata) {
            return await this.get(process.env.STRIPE_YEARLY_PRICE_ID!, email, metadata, 12);
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
};
