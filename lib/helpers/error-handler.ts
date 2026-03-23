import { PostgrestError } from '@supabase/supabase-js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorResponse } from './api-response';

type ErrorHandler = {
    error: unknown;
    statusCode?: number;
    defaultMessage?: string;
};

export function errorHandler({
    error,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    defaultMessage = ReasonPhrases.INTERNAL_SERVER_ERROR,
}: ErrorHandler) {
    if (error) {
        if (error instanceof Error) {
            return new ErrorResponse(statusCode, error.message || defaultMessage).send();
        }
        if (typeof error === 'object' && 'code' in error && 'message' in error) {
            const pgError = error as PostgrestError;
            let pgStatus: number;

            switch (pgError.code) {
                case 'PGRST116':
                    pgStatus = StatusCodes.NOT_FOUND;
                    break;
                default:
                    pgStatus = statusCode;
            }

            return new ErrorResponse(pgStatus, pgError.message || defaultMessage).send();
        }
    }
    return new ErrorResponse(statusCode, defaultMessage).send();
}
