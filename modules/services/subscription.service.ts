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
        create: async function (data: Partial<Subscription>) {
            return await subscriptionRepository.admin.create(data);
        },
        updateByBusinessId: async function (businessId: string, data: Partial<Subscription>) {
            return await subscriptionRepository.admin.updateByBusinessId(businessId, data);
        },
        getByBusinessId: async function (businessId: string) {
            return await subscriptionRepository.admin.getByBusinessId(businessId);
        },
        getAllActive: async function () {
            return await subscriptionRepository.admin.getAllActive();
        },
        updateByCustomerId: async function (customerId: string, data: Partial<Subscription>) {
            return await subscriptionRepository.admin.updateByCustomerId(customerId, data);
        },
    },
};
