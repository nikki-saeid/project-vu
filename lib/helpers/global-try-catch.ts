import { ControllerProps, isErrorThrown } from '../types/api';
import { errorHandler } from './error-handler';

export function tryCatchWrapper<T>(handler: (props: ControllerProps<T>) => Promise<Response>) {
    return async (props: ControllerProps<T>) => {
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
