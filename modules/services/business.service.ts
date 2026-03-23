import { generateUniqueSlug } from '@/lib/helpers/unique-slug';
import { Business } from '@/lib/types/db';
import { businessRepository } from '../repositories/business.repository';
import { storageService } from './storage.service';
import { userService } from './user.service';

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
        return business;
    },

    // update business
    update: async function (data: Partial<Business>, logo: File | null) {
        // generate slug if name is present in the request body
        if (!data.slug) {
            data.slug = generateUniqueSlug(data.name ?? '');
        }

        // logo
        if (logo) {
            const path = `${data.user_id}/logo.png`;
            data.logo_url = await storageService.uploadAfterResize(path, logo, 500, 500);
        }

        // update user metadata
        await userService.updateUser({ avatar_url: data.logo_url ?? '' });

        return await businessRepository.update(data);
    },
};
