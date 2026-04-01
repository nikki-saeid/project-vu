import { createsStripeServer } from '@/lib/stripe/server';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import { adminRepository } from './admin.repository';

type CheckoutSessionMetadata = {
    userId: string;
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

    webhook: async function (requestBuffer: string, stripeSignature: string) {
        const stripe = await createsStripeServer();
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

        const event = stripe.webhooks.constructEvent(requestBuffer, stripeSignature, webhookSecret);

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // ⚠️ Only useful to link user → subscription
                console.log('-----------------------');
                console.log('Checkout completed:', session.id);
                console.log('-----------------------');
                break;
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                const sub = event.data.object as Stripe.Subscription;

                // ✅ store/update subscription
                console.log('-----------------------');
                console.log('Subscription status:', sub.status);
                console.log('-----------------------');
                break;
            }

            case 'invoice.paid': {
                // get invoice
                const invoice = event.data.object as Stripe.Invoice;

                // get user id
                const userId = invoice.parent?.subscription_details?.metadata?.userId;
                if (!userId) {
                    throw { error: new Error('User is required'), status: StatusCodes.BAD_REQUEST };
                }

                // update user onboarding
                await adminRepository.updateUserById(userId, { is_onboarded: true });
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;

                // ❌ payment failed
                console.log('-----------------------');
                console.log('Payment failed:', invoice.id);
                console.log('-----------------------');
                break;
            }
        }
        return event.id;
    },
};

//   user_id,
//   stripe_subscription_id: sub.id,
//   stripe_customer_id: sub.customer,

//   status: sub.status,
//   price_id: sub.items.data[0].price.id,
//   product_id: sub.items.data[0].price.product,

//   current_period_start: sub.current_period_start,
//   current_period_end: sub.current_period_end,

//   cancel_at_period_end: sub.cancel_at_period_end,
