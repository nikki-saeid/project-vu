'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';

export const adminGetAnalyticsRevenueByMonth = async (month: number) => {
    const response = await fetcher<number>(`${API_URL}/admin/analytics/revenue?month=${month}`);
    return response.data;
};
