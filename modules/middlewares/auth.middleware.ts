import { errorHandler } from '@/lib/helpers/error-handler';
import type { ContextParams, NextFunction } from '@/lib/types/api';
import { StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';
import { userService } from '../services/user.service';

export const authMiddleware = {
    // user auth middleware
    user: function <T>(next: NextFunction<T>) {
        return async function (req: NextRequest, contextParams?: ContextParams<T>) {
            const user = await userService.get();

            if (!user) {
                return errorHandler({
                    error: new Error('You must be signed in'),
                    statusCode: StatusCodes.UNAUTHORIZED,
                });
            }

            return next({ req, user, contextParams, contextSearchParams: req.nextUrl.searchParams });
        };
    },

    // admin auth middleware
    admin: function <T>(next: NextFunction<T>) {
        return async function (req: NextRequest, contextParams?: ContextParams<T>) {
            const user = await userService.get();

            if (!user || user?.role !== 'admin') {
                return errorHandler({
                    error: new Error('You must be signed in'),
                    statusCode: StatusCodes.UNAUTHORIZED,
                });
            }

            return next({ req, user, contextParams, contextSearchParams: req.nextUrl.searchParams });
        };
    },
};
