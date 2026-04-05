import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { ControllerProps } from '@/lib/types/api';
import { Subscription } from '@/lib/types/db';
import { subscriptionService } from '../services/subscription.service';

export const subscriptionController = {
    // get by user id
    get: tryCatchWrapper(async function ({ user }: ControllerProps) {
        const subscription = await subscriptionService.user.getByUsedId(user.id);

        return new SuccessResponse<Subscription>('subscription retrieved successfully', subscription).send();
    }),
};
