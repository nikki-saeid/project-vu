import { ReasonPhrases } from 'http-status-codes';
import { APIResponseSend } from './api-response';

export async function fetcher<T>(url: string, options?: RequestInit): Promise<APIResponseSend<T>> {
    try {
        const res = await fetch(url, { ...options });

        let data: APIResponseSend<T> | null = null;

        try {
            data = (await res.json()) as APIResponseSend<T>;
        } catch {
            data = null;
        }

        if (!res.ok) {
            throw new Error(data?.message || 'Something went wrong');
        }

        return data as APIResponseSend<T>;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}
