import { PRICING_PLANS_IDS } from '@/lib/constants/pricing-plans';
import { stripeRepository } from '../repositories/stripe.repository';

export const stripeService = {
    // get stripe
    getCheckoutSessionByPlan: async function (plan: string, userId: string) {
        if (plan === PRICING_PLANS_IDS.monthly) {
            return await stripeRepository.checkoutSessionMonthly({ userId });
        }
        if (plan === PRICING_PLANS_IDS.six_month) {
            return await stripeRepository.checkoutSession6Monthly({ userId });
        }
        if (plan === PRICING_PLANS_IDS.annual) {
            return await stripeRepository.checkoutSessionYearly({ userId });
        }
        throw new Error('Invalid plan');
    },

    webhook: async function (requestBuffer: string, stripeSignature: string) {
        return stripeRepository.webhook(requestBuffer, stripeSignature);
    },
};
