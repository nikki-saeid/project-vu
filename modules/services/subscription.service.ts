import { Subscription } from '@/lib/types/db';
import { subscriptionRepository } from '../repositories/subscription.repository';

export const subscriptionService = {
    create: async function (data: Partial<Subscription>) {
        return await subscriptionRepository.create(data);
    },

    // get stripe
    updateByBusinessId: async function (businessId: string, data: Partial<Subscription>) {
        return await subscriptionRepository.updateByBusinessId(businessId, data);
    },
};
