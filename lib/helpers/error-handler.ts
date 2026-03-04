import { PostgrestError } from '@supabase/supabase-js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorResponse } from './api-response';

type ErrorHandler = {
    error: unknown;
    defaultValue?: { status: number; message: string };
};

export function errorHandler({
    error,
    defaultValue = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: ReasonPhrases.INTERNAL_SERVER_ERROR },
}: ErrorHandler) {
    const { status, message } = defaultValue;

    if (error) {
        if (error instanceof Error) {
            return new ErrorResponse(status, error.message || message).send();
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

            return new ErrorResponse(pgStatus, pgError.message || message).send();
        }
    }
    return new ErrorResponse(defaultValue.status, defaultValue.message).send();
}
