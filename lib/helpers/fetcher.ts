import { ReasonPhrases } from 'http-status-codes';
import { APIResponseSend } from './api-response';

export async function fetcher<T>(url: string, options?: RequestInit): Promise<APIResponseSend<T>> {
    try {
        const res = await fetch(url, { ...options });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || 'Request failed');
        }

        return data;
    } catch (error) {
        throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}
