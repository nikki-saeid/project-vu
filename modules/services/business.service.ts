import { generateUniqueSlug } from '@/lib/helpers/unique-slug';
import { Business } from '@/lib/types/db';
import { businessRepository } from '../repositories/business.repository';
import { storageRepository } from '../repositories/storage.repository';
import { storageService } from './storage.service';
import { StatusCodes } from 'http-status-codes';

export const businessService = {
    // get business by user id or create if not exists
    getByUserIdOrCreate: async function (userId: string, data: Partial<Business>) {
        let business = await businessRepository.getByUserId(userId);

        if (!business) {
            business = await businessRepository.create({
                user_id: userId,
                ...data,
            });
        }
        business.logo_url = business.logo_url ? await storageRepository.getStoragePublicUrl(business.logo_url) : business.logo_url;
        return business;
    },

    getByUserId: async function (userId: string) {
        return await businessRepository.getByUserId(userId);
    },

    // get business by slug
    getBySlug: async function (slug: string, userId: string | null) {
        const business = await businessRepository.getBySlug(slug);
        if (business) {
            business.logo_url = await storageRepository.getStoragePublicUrl(business.logo_url);

            if (business?.user_id === userId || business?.page_status === 'live') {
                return business;
            }
        }

        throw { error: new Error('Portfolio is not live'), status: StatusCodes.NOT_FOUND };
    },

    // update business
    update: async function (data: Partial<Business>, logo?: File) {
        // generate slug if name is present in the request body
        if (!data.slug) {
            data.slug = generateUniqueSlug(data.name ?? '');
        }

        // logo
        if (logo) {
            const path = `${data.user_id}/logo.webp`;
            await storageService.removeMany([path]);
            data.logo_url = await storageService.uploadAfterResize(path, logo, 500, 500);
        }

        // update
        const business = await businessRepository.update(data);
        business.logo_url = (await storageRepository.getStoragePublicUrl(business.logo_url)) + `?t=${Date.now()}`;
        return business;
    },

    // update business
    updatePageStatus: async function (data: Partial<Business>) {
        // update
        const business = await businessRepository.update(data);
        business.logo_url = (await storageRepository.getStoragePublicUrl(business.logo_url)) + `?t=${Date.now()}`;
        return business;
    },
};
