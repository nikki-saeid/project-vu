import { generateUniqueSlug } from '@/lib/helpers/unique-slug';
import { Business } from '@/lib/types/db';
import { businessRepository } from '../repositories/business.repository';
import { storageRepository } from '../repositories/storage.repository';
import { storageService } from './storage.service';

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
        business.logo_url = await storageRepository.getStoragePublicUrl(business.logo_url);
        return business;
    },

    // get business by slug
    getBySlug: async function (slug: string) {
        return await businessRepository.getBySlug(slug);
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
};
