'use server';
import { cookies } from 'next/headers';
import { API_URL } from '../../constants/urls';
import { fetcher } from '../../helpers/fetcher';
import { Pagination, User } from '@supabase/supabase-js';
import { Business } from '@/lib/types/db';

export type AdminUsersResponse = { users: User[]; aud: string } & Pagination;

export const getAdminUsers = async (page: number) => {
    const cookie = await cookies();
    return await fetcher<AdminUsersResponse>(`${API_URL}/admin/user/all?page=${page ?? '1'}`, {
        headers: { Cookie: cookie.toString() },
    });
};

export const adminDisableUser = async (userId: string, activate: boolean) => {
    const cookie = await cookies();
    return await fetcher(`${API_URL}/admin/user/${userId}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: cookie.toString() },
        body: JSON.stringify({ activate }),
    });
};

export const adminGetUserBusiness = async (userId: string) => {
    const cookie = await cookies();
    return await fetcher<Business>(`${API_URL}/admin/user/${userId}/business`, {
        headers: { Cookie: cookie.toString() },
    });
};
