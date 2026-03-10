'use server';
import { cookies } from 'next/headers';
import { API_URL } from '../../constants/urls';
import { fetcher } from '../../helpers/fetcher';
import { Pagination, User } from '@supabase/supabase-js';
import { AdminAnalyticsResponse } from '@/lib/types/api';

export type AdminUsersResponse = { users: User[]; aud: string } & Pagination;

export const getAdminAnalytics = async () => {
    const cookie = await cookies();
    return await fetcher<AdminAnalyticsResponse>(`${API_URL}/admin/analytics`, {
        headers: { Cookie: cookie.toString() },
    });
};
