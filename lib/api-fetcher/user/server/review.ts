'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import type { Review } from '@/lib/types/db';
import { cookies } from 'next/headers';

export const getUserReviews = async () => {
    const cookie = await cookies();
    const response = await fetcher<Review[]>(`${API_URL}/user/review/many`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};

export const getPublicReviewById = async (id: string) => {
    const cookie = await cookies();
    const response = await fetcher<Review>(`${API_URL}/public/review/${id}`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};

export const getPublicReviewsBySlug = async (slug: string) => {
    const cookie = await cookies();
    const response = await fetcher<Review[]>(`${API_URL}/public/review/many/${slug}`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};
