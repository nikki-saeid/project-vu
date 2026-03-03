import { PostgrestError } from '@supabase/supabase-js';
import { StatusCodes } from 'http-status-codes';

type ErrorHandler = {
    error: unknown;
    defaultValue: { status: number; message: string };
};

export function errorHandler({ error, defaultValue }: ErrorHandler) {
    const { status, message } = defaultValue;

    if (error) {
        if (error instanceof Error) {
            return {
                status,
                message: error.message || message,
            };
        }
        if (typeof error === 'object' && 'code' in error && 'message' in error) {
            const pgError = error as PostgrestError;
            let pgStatus: number;

            switch (pgError.code) {
                case 'PGRST116':
                    pgStatus = StatusCodes.NOT_FOUND;
                    break;
                default:
                    pgStatus = status;
            }

            return {
                status: pgStatus,
                message: pgError.message || message,
            };
        }
    }
    return defaultValue;
}
