'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { cookies } from 'next/headers';

export const adminGetAnalyticsRevenueByMonth = async (month: number) => {
    const cookie = await cookies();
    const response = await fetcher<number>(`${API_URL}/admin/analytics/revenue?month=${month}`, {
        headers: { Cookie: cookie.toString() },
    });
    return response.data;
};
