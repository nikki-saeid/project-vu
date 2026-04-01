'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import type { Subscription } from '@/lib/types/db';
import { cookies } from 'next/headers';

export const getUserSubscription = async () => {
    const cookie = await cookies();
    const response = await fetcher<Subscription>(`${API_URL}/user/subscription`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};
