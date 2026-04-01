import { Subscription } from '@/lib/types/db';
import { subscriptionRepository } from '../repositories/subscription.repository';
import { businessService } from './business.service';
import { StatusCodes } from 'http-status-codes';

export const subscriptionService = {
    // -------------------- USER --------------------

    // get by user id
    getByUsedId: async function (userId: string) {
        const business = await businessService.getByUserId(userId);
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        return await subscriptionRepository.getByBusinessId(business.id);
    },

    // -------------------- ADMIN --------------------

    // create
    adminCreate: async function (data: Partial<Subscription>) {
        return await subscriptionRepository.adminCreate(data);
    },
    // update
    adminUpdateByBusinessId: async function (businessId: string, data: Partial<Subscription>) {
        return await subscriptionRepository.adminUpdateByBusinessId(businessId, data);
    },
};
