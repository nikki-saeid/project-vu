'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { PriceResponse } from '@/lib/types/api';
import { cookies } from 'next/headers';

export const getPublicAllStripePricings = async () => {
    const cookie = await cookies();
    const response = await fetcher<PriceResponse[]>(`${API_URL}/stripe/price/all`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};

export const getUserPriceById = async (id: string) => {
    const cookie = await cookies();
    const response = await fetcher<PriceResponse>(`${API_URL}/user/price/${id}`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};
