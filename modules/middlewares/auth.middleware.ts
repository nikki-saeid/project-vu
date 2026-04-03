/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { errorHandler } from '@/lib/helpers/error-handler';
import { StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';
import { userService } from '../services/user.service';
import { ContextParams } from '@/lib/types/api';

export const authMiddleware = {
    // user auth middleware
    user: function <T>(next: Function) {
        return async function (req: NextRequest, context?: ContextParams<T>) {
            const user = await userService.getUser();

            if (!user) {
                return errorHandler({
                    error: new Error('You must be signed'),
                    statusCode: StatusCodes.UNAUTHORIZED,
                });
            }

            return next({ req, user, context });
        };
    },

    // admin auth middleware
    admin: function <T>(next: Function) {
        return async function (req: NextRequest, context?: ContextParams<T>) {
            const user = await userService.getUser();

            if (!user || user?.role !== 'admin') {
                return errorHandler({
                    error: new Error('You must be signed'),
                    statusCode: StatusCodes.UNAUTHORIZED,
                });
            }

            return next({ req, user, context });
        };
    },
};
