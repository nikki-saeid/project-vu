import { ContextParams, NextFunctionPublic } from '@/lib/types/api';
import { NextRequest } from 'next/server';
import { userService } from '../services/user.service';

export const publicMiddleware = {
    // user auth middleware
    public: function <T>(next: NextFunctionPublic<T>) {
        return async function (req: NextRequest, context: ContextParams<T>) {
            const user = await userService.get();

            return next({ req, user, contextParams: context, contextSearchParams: req.nextUrl.searchParams });
        };
    },
};
