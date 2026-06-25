import { projectService } from './../services/project.service';
import { StatusCodes } from 'http-status-codes';
import { subscriptionService } from '../services/subscription.service';
import { MAX_MONTHS_FREE_PLAN, MAX_PROJECTS_FREE_PLAN } from '@/lib/constants/pricing-plans';
import { addMonths } from 'date-fns';
import { businessRepository } from '../repositories/business.repository';
import { DEMO_USER_ID } from '@/lib/constants/urls';
import { Subscription } from '@/lib/types/db';

export const subscriptionMiddleware = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    projectsMax: async function (next: Function, userId: string) {
        if (userId === DEMO_USER_ID) return await next();
        const subscription = await subscriptionService.user.getByUsedId(userId);
        const projects = await projectService.getMany(userId);

        if (!subscription && projects.length >= MAX_PROJECTS_FREE_PLAN) {
            throw {
                error: new Error('You have reached the maximum number of projects, Please upgrade your plan to add unlimited projects'),
                status: StatusCodes.FORBIDDEN,
            };
        }

        return next();
    },

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    profileToDraft: async function (next: Function, userId: string, message?: string) {
        if (userId === DEMO_USER_ID) return await next();

        let subscription: Subscription | null = null;

        try {
            subscription = await subscriptionService.user.getByUsedId(userId);
        } catch (error) {
            console.log(error);
        }

        if (
            subscription &&
            (subscription.status !== 'active' || new Date(subscription.current_period_end ?? '').getTime() < new Date().getTime())
        ) {
            // expired free plan -> business status to draft
            await businessRepository.update({ user_id: userId, page_status: 'draft' });
            if (message) {
                throw {
                    error: new Error(message),
                    status: StatusCodes.FORBIDDEN,
                };
            }
        } else if (!subscription) {
            const business = await businessRepository.getByUserId(userId);

            if (business) {
                const validUntilDate = addMonths(business.created_at, MAX_MONTHS_FREE_PLAN);

                if (validUntilDate.getTime() < new Date().getTime()) {
                    // expired free plan -> business status to draft
                    await businessRepository.update({ user_id: userId, page_status: 'draft' });
                    if (message) {
                        throw {
                            error: new Error(message),
                            status: StatusCodes.FORBIDDEN,
                        };
                    }
                }
            }
        }

        return await next();
    },

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    profileToDraftByDraft: async function (next: Function, slug: string) {
        const business = await businessRepository.getBySlug(slug);

        if (business) {
            const userId = business.user_id;
            if (userId === DEMO_USER_ID) return await next();

            const subscription = await subscriptionService.user.getByUsedId(userId);

            if (
                subscription &&
                (subscription.status !== 'active' || new Date(subscription.current_period_end ?? '').getTime() < new Date().getTime())
            ) {
                // expired free plan -> business status to draft
                await businessRepository.admin.update({ user_id: userId, page_status: 'draft' });
            } else if (!subscription) {
                const validUntilDate = addMonths(business.created_at, MAX_MONTHS_FREE_PLAN);

                if (validUntilDate.getTime() < new Date().getTime()) {
                    // expired free plan -> business status to draft
                    await businessRepository.admin.update({ user_id: userId, page_status: 'draft' });
                    console.log('expired free plan -> business status to draft');
                }
            }
        }

        return await next();
    },
};
