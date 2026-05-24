'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

export const adminGetAllPricing = async () => {
    const cookie = await cookies();
    const response = await fetcher<Stripe.Price[]>(`${API_URL}/admin/pricing/all`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};
