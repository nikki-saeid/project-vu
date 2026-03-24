import { SuccessResponse } from '@/lib/helpers/api-response';
import { tryCatchWrapper } from '@/lib/helpers/global-try-catch';
import { User } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { adminService } from '../services/admin.service';
import { userService } from '../services/user.service';

export const userController = {
    // update user
    update: tryCatchWrapper(async (req: NextRequest) => {
        // Get the body
        const body = await req.json();

        // Update the user
        const user = await userService.updateUser(body);
        return new SuccessResponse<User | null>('Your profile updated successfully', user).send();
    }),

    // delete user
    delete: tryCatchWrapper(async (_, user: User) => {
        // Update the user
        await adminService.deleteUserById(user.id);
        return new SuccessResponse('Your account deleted successfully', null).send();
    }),
};
