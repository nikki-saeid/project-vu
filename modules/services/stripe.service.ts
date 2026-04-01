import { PRICING_PLANS_IDS } from '@/lib/constants/pricing-plans';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import { stripeRepository } from '../repositories/stripe.repository';
import { businessService } from './business.service';
import { subscriptionService } from './subscription.service';
import { unixToDBString } from '@/lib/utils/unixToString';

type UserInfo = {
    userId: string;
    email: string;
};

export const stripeService = {
    // get stripe
    getCheckoutSessionByPlan: async function (plan: string, { userId, email }: UserInfo) {
        // get business
        const business = await businessService.getByUserId(userId);
        if (!business) {
            throw { error: new Error('Business is required'), status: StatusCodes.BAD_REQUEST };
        }

        switch (plan) {
            case PRICING_PLANS_IDS.monthly:
                return await stripeRepository.checkoutSessionMonthly(email, { businessId: business.id });
            case PRICING_PLANS_IDS.six_month:
                return await stripeRepository.checkoutSession6Monthly(email, { businessId: business.id });
            case PRICING_PLANS_IDS.annual:
                return await stripeRepository.checkoutSessionYearly(email, { businessId: business.id });
            default:
                throw new Error('Invalid plan');
        }
    },

    createSubscription: async function (subscription: Stripe.Subscription) {
        // get business id
        const businessId = subscription?.metadata?.businessId;
        if (!businessId) {
            throw { error: new Error('Business is required'), status: StatusCodes.BAD_REQUEST };
        }

        // create subscription
        const product = subscription.items.data[0].price.product;
        const customer = subscription.customer;
        return await subscriptionService.adminCreate({
            business_id: businessId,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
            cancel_at_period_end: subscription.cancel_at_period_end,
            stripe_customer_id: typeof customer === 'string' ? customer : customer.id,
            product_id: typeof product === 'string' ? product : product.id,
        });
    },

    updateSubscription: async function (subscription: Stripe.Subscription) {
        // get business id

        const businessId = subscription?.metadata?.businessId;
        if (!businessId) {
            throw { error: new Error('Business is required'), status: StatusCodes.BAD_REQUEST };
        }

        // create subscription
        const product = subscription.items.data[0].price.product;
        const customer = subscription.customer;
        return await subscriptionService.adminUpdateByBusinessId(businessId, {
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
            cancel_at_period_end: subscription.cancel_at_period_end,
            stripe_customer_id: typeof customer === 'string' ? customer : customer.id,
            product_id: typeof product === 'string' ? product : product.id,
        });
    },

    updateSubscriptionInvoicePeriod: async function (invoice: Stripe.Invoice) {
        // get business id
        const businessId = invoice.parent?.subscription_details?.metadata?.businessId;
        if (!businessId) {
            throw { error: new Error('Business is required'), status: StatusCodes.BAD_REQUEST };
        }

        // create subscription
        return await subscriptionService.adminUpdateByBusinessId(businessId, {
            current_period_start: unixToDBString(invoice.lines.data[0].period.start),
            current_period_end: unixToDBString(invoice.lines.data[0].period.end),
        });
    },

    webhook: async function (requestBuffer: string, stripeSignature: string) {
        const event = await stripeRepository.webhook(requestBuffer, stripeSignature);

        switch (event.type) {
            case 'customer.subscription.created': {
                await this.createSubscription(event.data.object);
                return;
            }

            case 'customer.subscription.updated': {
                await this.updateSubscription(event.data.object);
                return;
            }

            case 'invoice.paid': {
                await this.updateSubscriptionInvoicePeriod(event.data.object);
                return;
            }

            case 'invoice.payment_failed': {
                // const invoice = event.data.object as Stripe.Invoice;
                break;
            }
        }
    },
};
