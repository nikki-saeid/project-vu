'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { UsersWithPagination } from '@/lib/types/api';
import { User } from '@supabase/supabase-js';

export const adminBanUser = async (userId: string) => {
    const response = await fetcher<User>(`${API_URL}/admin/user/${userId}/ban`, {
        method: 'POST',
    });
    return response;
};

export const adminActivateUser = async (userId: string) => {
    const response = await fetcher<User>(`${API_URL}/admin/user/${userId}/activate`, {
        method: 'POST',
    });
    return response;
};

export const adminGetUsers = async (page: number) => {
    const response = await fetcher<UsersWithPagination>(`${API_URL}/admin/user/many?page=${page}`);
    return response.data;
};
