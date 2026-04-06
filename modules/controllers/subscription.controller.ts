import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapperPrivate } from '@/lib/helpers/global-try-catch';
import { ControllerPropsPrivate } from '@/lib/types/api';
import { Subscription } from '@/lib/types/db';
import { subscriptionService } from '../services/subscription.service';

export const subscriptionController = {
    // get by user id
    get: tryCatchWrapperPrivate(async function ({ user }: ControllerPropsPrivate) {
        const subscription = await subscriptionService.user.getByUsedId(user.id);

        return new SuccessResponse<Subscription>('subscription retrieved successfully', subscription).send();
    }),
};
