import { projectService } from './../services/project.service';
import { StatusCodes } from 'http-status-codes';
import { subscriptionService } from '../services/subscription.service';
import { MAX_PROJECTS_FREE_PLAN } from '@/lib/constants/pricing-plans';

export const subscriptionMiddleware = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    projectsMax: async function (next: Function, userId: string) {
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
    subscribedWithProjectsMax: async function (next: Function, userId: string) {
        const projects = await projectService.getMany(userId);

        if (projects.length > MAX_PROJECTS_FREE_PLAN) {
            const subscription = await subscriptionService.user.getByUsedId(userId);
            if (
                subscription &&
                (subscription.status !== 'active' || new Date(subscription.current_period_end ?? '').getTime() < new Date().getTime())
            ) {
                throw {
                    error: new Error('Your subscription is not active, Please subscribe to a plan to keep using your projects'),
                    status: StatusCodes.FORBIDDEN,
                };
            }
        }

        return next();
    },
};
