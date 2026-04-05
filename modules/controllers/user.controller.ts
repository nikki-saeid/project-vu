import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { ControllerProps } from '@/lib/types/api';
import { User } from '@supabase/supabase-js';
import { adminService } from '../services/admin.service';
import { userService } from '../services/user.service';

export const userController = {
    // update user
    update: tryCatchWrapper(async ({ req }: ControllerProps) => {
        // Get the body
        const body = await req.json();

        // Update the user
        const user = await userService.update(body);
        return new SuccessResponse<User | null>('Your profile updated successfully', user).send();
    }),

    // delete user
    delete: tryCatchWrapper(async ({ user }: ControllerProps) => {
        // Update the user
        await adminService.user.deleteById(user.id);
        return new SuccessResponse('Your account deleted successfully', null).send();
    }),
};
