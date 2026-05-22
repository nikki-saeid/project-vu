import { Business, Review } from '@/lib/types/db';
import { StatusCodes } from 'http-status-codes';
import { businessRepository } from '../repositories/business.repository';
import { reviewRepository } from '../repositories/review.repository';
import { emailService } from './email.service';

export const reviewService = {
    // get business by user id or create if not exists
    request: async function (userId: string, data: Partial<Review>) {
        // get the business
        const business = (await businessRepository.getByUserId(userId)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // create review
        const review = await reviewRepository.create({ ...data, business_id: business.id });

        // send email
        await emailService.sendReviewRequest(
            review.id,
            review.email,
            business.name ?? 'Project Vu',
            review.name,
            review.request_comment ?? undefined,
        );

        return review;
    },

    getMany: async function (userId: string) {
        // get the business
        const business = (await businessRepository.getByUserId(userId)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // get the projects
        return await reviewRepository.getManyByBusinessId(business.id);
    },

    getById: async function (id: string) {
        return await reviewRepository.getById(id);
    },

    updateById: async function (id: string, data: Partial<Review>) {
        return await reviewRepository.updateById(id, data);
    },

    getManyByBusinessSlug: async function (slug: string) {
        // get the business
        const business = (await businessRepository.getBySlug(slug)) as Business;
        if (!business) {
            throw { error: new Error('Business not found'), status: StatusCodes.NOT_FOUND };
        }

        // get the projects
        return await reviewRepository.getManyByBusinessId(business.id);
    },
};
