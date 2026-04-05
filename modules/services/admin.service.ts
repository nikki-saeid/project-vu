import { adminRepository } from '../repositories/admin.repository';
import { businessService } from './business.service';
import { projectService } from './project.service';
import { storageService } from './storage.service';
import { stripeService } from './stripe.service';
import { subscriptionService } from './subscription.service';

export const adminService = {
    // get user
    user: {
        deleteById: async function (userId: string) {
            // get business to remove logo
            const business = await businessService.getByUserId(userId);
            storageService.removeMany([business.logo_url ?? '']);

            // get projects to delete images
            const projects = await projectService.getMany(userId);
            for (let i = 0; i < projects.length; i++) {
                const { images_urls } = projects[i];
                await storageService.removeMany(images_urls ?? []);
            }

            // remove user
            return await adminRepository.user.deleteById(userId);
        },
        getMany: async function (page: number) {
            return await adminRepository.user.getMany(page);
        },
        activateById: async function (userId: string) {
            return await adminRepository.user.activateById(userId);
        },
        banById: async function (userId: string) {
            return await adminRepository.user.banById(userId);
        },
    },

    subscription: {
        getAllActive: async function () {
            return await subscriptionService.admin.getAllActive();
        },
    },
    // business: {
    //     updateByUserId: async function (userId: string, data: Partial<Business>) {
    //         return await adminRepository.business.updateByUserId(userId, data);
    //     },

    //     updateById: async function (id: string, data: Partial<Business>) {
    //         return await adminRepository.business.updateById(id, data);
    //     },
    // },

    analytics: {
        getNetRevenueByMonth: async function (month: number) {
            const balanceTransactions = await stripeService.balanceTransaction.getAllByMonth(month);

            const netRevenue = balanceTransactions.reduce((accumulator, currentValue) => accumulator + currentValue.net, 0);
            return Math.ceil(netRevenue / balanceTransactions.length);
        },
    },
};
