import { ControllerPropsPrivate, ControllerPropsPublic, isErrorThrown } from '../types/api';
import { errorHandler } from './error-handler';

export function tryCatchWrapperPrivate<T>(handler: (props: ControllerPropsPrivate<T>) => Promise<Response>) {
    return async (props: ControllerPropsPrivate<T>) => {
        try {
            return await handler(props);
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

export function tryCatchWrapperPublic<T>(handler: (props: ControllerPropsPublic<T>) => Promise<Response>) {
    return async (props: ControllerPropsPublic<T>) => {
        try {
            return await handler(props);
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
