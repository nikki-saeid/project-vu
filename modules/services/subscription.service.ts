import { Subscription } from '@/lib/types/db';
import { subscriptionRepository } from '../repositories/subscription.repository';
import { businessService } from './business.service';
import { StatusCodes } from 'http-status-codes';

export const subscriptionService = {
    user: {
        getByUsedId: async function (userId: string) {
            const business = await businessService.getByUserId(userId);
            if (!business) {
                throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
            }

            return await subscriptionRepository.user.getByBusinessId(business.id);
        },
    },
    admin: {
        // create
        create: async function (data: Partial<Subscription>) {
            return await subscriptionRepository.admin.create(data);
        },
        // update
        updateByBusinessId: async function (businessId: string, data: Partial<Subscription>) {
            return await subscriptionRepository.admin.updateByBusinessId(businessId, data);
        },
        getAllActive: async function () {
            return await subscriptionRepository.admin.getAllActive();
        },
    },
};
