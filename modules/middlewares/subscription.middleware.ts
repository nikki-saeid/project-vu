import { projectService } from './../services/project.service';
import { StatusCodes } from 'http-status-codes';
import { subscriptionService } from '../services/subscription.service';

export const subscriptionMiddleware = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    projectsMax: async function (next: Function, userId: string) {
        const subscription = await subscriptionService.user.getByUsedId(userId);
        const projects = await projectService.getMany(userId);

        if (!subscription && projects.length >= 3) {
            throw { error: new Error('You have reached the maximum number of projects, Please upgrade your plan to add unlimited projects'), status: StatusCodes.FORBIDDEN };
        }

        return next();
    },
};
