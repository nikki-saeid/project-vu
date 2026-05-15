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

// ================> event.type: invoice.created
// ================> event.type: invoice.paid
// ================> event.type: invoice.finalized
// ================> event.type: payment_method.attached

// ================> event.type: customer.created

// ================> event.type: customer.subscription.created
// ================> event.type: payment_intent.succeeded
// ================> event.type: payment_intent.created
// ================> event.type: customer.updated
// ================> event.type: invoice_payment.paid

export const stripeService = {
    webhook: async function (requestBuffer: string, stripeSignature: string) {
        const event = await stripeRepository.webhook(requestBuffer, stripeSignature);

        switch (event.type) {
            case 'invoice.created':
            case 'invoice.paid':
            case 'invoice.finalized': {
                await this.subscription.invoice(event.data.object);
                return;
            }

            case 'payment_method.attached': {
                await this.subscription.paymentMethod(event.data.object);
                return;
            }

            case 'customer.created':
            case 'customer.updated': {
                this.subscription.customer(event.data.object);
                return;
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                await this.subscription.subscription(event.data.object);
                return;
            }
        }
    },

    subscription: {
        invoice: async function (invoice: Stripe.Invoice) {
            // get business id
            const businessId = invoice.parent?.subscription_details?.metadata?.businessId;
            if (!businessId) {
                throw { error: new Error('Business is required'), status: StatusCodes.BAD_REQUEST };
            }

            // get customer id
            let customerId: string | null = null;
            if (invoice.customer) {
                customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer.id;
            }

            // check if businessId has a subscription
            const subscription = await subscriptionService.admin.getByBusinessId(businessId);
            if (!subscription) {
                return await subscriptionService.admin.create({
                    business_id: businessId,
                    stripe_customer_id: customerId,
                });
            }

            // create subscription
            return await subscriptionService.admin.updateByBusinessId(businessId, {
                current_period_start: unixToDBString(invoice.lines.data[0].period.start),
                current_period_end: unixToDBString(invoice.lines.data[0].period.end),
                stripe_customer_id: customerId,
            });
        },

        paymentMethod: async function (paymentMethod: Stripe.PaymentMethod) {
            const customer = paymentMethod.customer;
            if (!customer) return;

            // get customer id
            const customerId = typeof customer === 'string' ? customer : customer.id;
            // create subscription
            return await subscriptionService.admin.updateByCustomerId(customerId, {
                stripe_customer_id: customerId,
                payment_method_id: paymentMethod?.id,
                payment_method_type: paymentMethod?.type,
                card_brand: paymentMethod?.card?.brand,
                card_last4: paymentMethod?.card?.last4,
            });
        },

        customer: async function (customer: Stripe.Customer) {
            const paymentMethod = customer.invoice_settings?.default_payment_method;
            if (!paymentMethod) return;

            // get paymentMethod a string (id)
            if (typeof paymentMethod === 'string') {
                return await subscriptionService.admin.updateByCustomerId(customer.id, {
                    payment_method_id: paymentMethod,
                });
            }

            return await this.paymentMethod(paymentMethod);
        },

        subscription: async function (subscription: Stripe.Subscription) {
            // get business id
            const businessId = subscription?.metadata?.businessId;
            const plan = subscription?.metadata?.plan;
            if (!businessId) {
                throw { error: new Error('Business is required'), status: StatusCodes.BAD_REQUEST };
            }

            // create subscription
            const product = subscription.items.data[0].price.product;

            await subscriptionService.admin.updateByBusinessId(businessId, {
                stripe_subscription_id: subscription.id,
                status: subscription.status,
                price_id: subscription.items.data[0].price.id,
                cancel_at_period_end: subscription.cancel_at_period_end,
                product_id: typeof product === 'string' ? product : product.id,
                plan,
            });

            // add customer
            const customer = subscription.customer;
            if (typeof customer === 'string') {
                return await subscriptionService.admin.updateByBusinessId(businessId, {
                    stripe_customer_id: customer,
                });
            }

            if (!customer.deleted) {
                return await this.customer(customer);
            }

            return;
        },

        cancelById: async function (id: string) {
            return await stripeRepository.subscription.cancelById(id);
        },

        resumeById: async function (id: string) {
            return await stripeRepository.subscription.resumeById(id);
        },
    },

    checkoutSession: {
        getByPlan: async function (plan: string, { userId, email }: UserInfo) {
            // get business
            const business = await businessService.getByUserId(userId);
            if (!business) {
                throw { error: new Error('Business is required'), status: StatusCodes.BAD_REQUEST };
            }

            switch (plan) {
                case PRICING_PLANS_IDS.monthly:
                    return await stripeRepository.checkoutSession.getMonthly(email, { plan, businessId: business.id });
                case PRICING_PLANS_IDS.six_month:
                    return await stripeRepository.checkoutSession.get6Monthly(email, { plan, businessId: business.id });
                case PRICING_PLANS_IDS.annual:
                    return await stripeRepository.checkoutSession.getYearly(email, { plan, businessId: business.id });
                default:
                    throw new Error('Invalid plan');
            }
        },
    },

    invoice: {
        getManyByStripeCustomerId: async function (stripeCustomerId: string) {
            return await stripeRepository.invoice.getManyByStripeCustomerId(stripeCustomerId, 5);
        },
    },

    balanceTransaction: {
        getAllByMonth: async function (month: number) {
            return await stripeRepository.balanceTransaction.getAllByMonth(month);
        },
    },
};
