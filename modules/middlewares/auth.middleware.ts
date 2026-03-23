/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { errorHandler } from '@/lib/helpers/error-handler';
import { StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';
import { userService } from '../services/user.service';

export const authMiddleware = {
    // user auth middleware
    user: function (next: Function) {
        return async function (req: NextRequest) {
            const user = await userService.getUser();

            if (!user) {
                return errorHandler({
                    error: new Error('You must be signed'),
                    statusCode: StatusCodes.UNAUTHORIZED,
                });
            }

            return next(req, user);
        };
    },

    // admin auth middleware
    admin: function (next: Function) {
        return async function (req: NextRequest) {
            const user = await userService.getUser();

            if (!user || user.app_metadata?.role !== 'admin') {
                return errorHandler({
                    error: new Error('You must be signed'),
                    statusCode: StatusCodes.UNAUTHORIZED,
                });
            }

            return next(req, user);
        };
    },
};
