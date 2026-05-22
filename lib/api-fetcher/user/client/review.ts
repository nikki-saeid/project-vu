import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { Review } from '@/lib/types/db';

export async function createReviewRequest(body: string) {
    const response = await fetcher<Review>(`${API_URL}/user/review/request`, {
        method: 'POST',
        body,
    });
    return response;
}

export async function updatepublicReviewById(body: string, id: string) {
    const response = await fetcher<Review>(`${API_URL}/public/review/${id}`, {
        method: 'PUT',
        body,
    });
    return response;
}
