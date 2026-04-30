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
        return await this.makeBusinessLogoPublic(business);
    },

    getByUserId: async function (userId: string) {
        const business = await businessRepository.getByUserId(userId);
        return await this.makeBusinessLogoPublic(business);
    },

    makeBusinessLogoPublic: async function (business: Business) {
        if (!business.logo_url || !business.favicon_url) return business;

        business.logo_url = (await storageRepository.getStoragePublicUrl(business.logo_url)) + `?t=${Date.now()}`;
        business.favicon_url = (await storageRepository.getStoragePublicUrl(business.favicon_url)) + `?t=${Date.now()}`;
        return business;
    },

    // get business by slug
    getBySlug: async function (slug: string, userId: string | null) {
        // get business
        const business = await businessRepository.getBySlug(slug);

        // check if business is live
        if (business) {
            if (business?.user_id === userId || business?.page_status === 'live') {
                return await this.makeBusinessLogoPublic(business);
            }
        }

        throw { error: new Error('Portfolio is not live'), status: StatusCodes.NOT_FOUND };
    },

    slug: {
        slugIncrement: function (slug: string, increment?: number) {
            if (!increment) {
                return slug;
            }
            return slug + '-' + increment;
        },
        generateUnique: async function (name: string) {
            const slugBase = name
                .toLowerCase()
                .replace(/[\s\W-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            let i = 0;
            while (true) {
                const slug = this.slugIncrement(slugBase, i === 0 ? undefined : i);

                if (!(await businessRepository.getBySlug(slug))) {
                    return slug;
                }
                i++;
            }
        },
    },

    // update business
    update: async function (data: Partial<Business>, logo?: File) {
        // generate slug if name is present in the request body
        if (!data.slug && data.name) {
            data.slug = await this.slug.generateUnique(data.name);
        }

        // logo
        if (logo) {
            const path = `${data.user_id}/logo.webp`;
            const pathFavicon = `${data.user_id}/favicon.webp`;
            await storageService.removeMany([path, pathFavicon]);
            data.logo_url = await storageService.uploadAfterResize(path, logo, 500, 500);
            data.favicon_url = await storageService.uploadAfterResize(pathFavicon, logo, 80, 80, true);
        }

        // update
        let business = await businessRepository.update(data);

        // make business logo public
        business = await this.makeBusinessLogoPublic(business);
        return business;
    },
};
