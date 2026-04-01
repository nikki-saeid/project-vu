'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { Business } from '@/lib/types/db';
import { cookies } from 'next/headers';

export const getUserBusiness = async () => {
    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/user/business`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};

export const getPublicBusinessBySlug = async (slug: string) => {
    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/public/business/${slug}`, {
        headers: { Cookie: cookie.toString() },
    });
    return response.data;
};

export const updateOnboardingStatus = async (is_onboarded: boolean) => {
    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/user/business/is-onboarded`, {
        method: 'PUT',
        body: JSON.stringify({ is_onboarded }),
        headers: { Cookie: cookie.toString() },
    });
    return response.data;
};
