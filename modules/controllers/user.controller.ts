import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapperPrivate } from '@/lib/helpers/global-try-catch';
import { ControllerPropsPrivate } from '@/lib/types/api';
import { User } from '@supabase/supabase-js';
import { adminService } from '../services/admin.service';
import { userService } from '../services/user.service';

export const userController = {
    // update user
    update: tryCatchWrapperPrivate(async ({ req }: ControllerPropsPrivate) => {
        // Get the body
        const body = await req.json();

        // Update the user
        const user = await userService.update(body);
        return new SuccessResponse<User | null>('Your profile updated successfully', user).send();
    }),

    // delete user
    delete: tryCatchWrapperPrivate(async ({ user }: ControllerPropsPrivate) => {
        // Update the user
        await adminService.user.deleteById(user.id);
        return new SuccessResponse('Your account deleted successfully', null).send();
    }),
};
