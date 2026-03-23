import { User } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { ContextParams, isErrorThrown } from '../types/api';
import { errorHandler } from './error-handler';

export function tryCatchWrapper<T>(handler: (req: NextRequest, user: User, context: ContextParams<T>) => Promise<Response>) {
    return async (req: NextRequest, user: User, context: ContextParams<T>) => {
        try {
            return await handler(req, user, context);
        } catch (error) {
            if (isErrorThrown(error)) {
                return errorHandler({
                    error: error.error,
                    statusCode: error.status,
                });
            }

            return errorHandler({ error });
        }
    };
}
