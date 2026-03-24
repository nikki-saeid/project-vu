/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { ContextParams } from '@/lib/types/api';
import { NextRequest } from 'next/server';
import { userService } from '../services/user.service';

export const publicMiddleware = {
    // user auth middleware
    public: function <T>(next: Function) {
        return async function (req: NextRequest, context?: ContextParams<T>) {
            const user = await userService.getUser();
            return next(req, user, context);
        };
    },
};
