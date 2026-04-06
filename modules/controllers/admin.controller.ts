import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapperPrivate } from '@/lib/helpers/global-try-catch';
import { ControllerPropsPrivate, ParamsId, UsersWithPagination } from '@/lib/types/api';
import { adminService } from '../services/admin.service';
import { Subscription } from '@/lib/types/db';
import { User } from '@supabase/supabase-js';

export const adminController = {
    // update user
    analytics: {
        getNetRevenueByMonth: tryCatchWrapperPrivate(async ({ contextSearchParams }: ControllerPropsPrivate) => {
            // Get the body
            if (!contextSearchParams) throw new Error('Month is required');
            const month = contextSearchParams.get('month');

            // Update the user
            const revenue = await adminService.analytics.getNetRevenueByMonth(Number(month));
            return new SuccessResponse<number>('Analytics fetched successfully', revenue).send();
        }),
    },
    user: {
        getMany: tryCatchWrapperPrivate(async ({ contextSearchParams }: ControllerPropsPrivate) => {
            // Get the body
            if (!contextSearchParams) throw new Error('Page is required');
            const page = contextSearchParams.get('page');

            // Update the user
            const users = await adminService.user.getMany(Number(page));
            return new SuccessResponse<UsersWithPagination>('Users fetched successfully', users).send();
        }),
        activateById: tryCatchWrapperPrivate(async ({ contextParams }: ControllerPropsPrivate<ParamsId>) => {
            // Get the body
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { id } = params;

            // Update the user
            const user = await adminService.user.activateById(id);
            return new SuccessResponse<User | null>('User activated successfully', user).send();
        }),

        banById: tryCatchWrapperPrivate(async ({ contextParams }: ControllerPropsPrivate<ParamsId>) => {
            // Get the body
            if (!contextParams) throw new Error('Id is required');
            const params = await contextParams.params;
            const { id } = params;

            // Update the user
            const user = await adminService.user.banById(id);
            return new SuccessResponse<User | null>('User banned successfully', user).send();
        }),
    },
    subscription: {
        getAllActive: tryCatchWrapperPrivate(async () => {
            const subscriptions = await adminService.subscription.getAllActive();
            return new SuccessResponse<Subscription[]>('Active subscriptions fetched successfully', subscriptions).send();
        }),
    },
};
