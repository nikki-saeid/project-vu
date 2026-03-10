'use server';
import { cookies } from 'next/headers';
import { API_URL } from '../../constants/urls';
import { fetcher } from '../../helpers/fetcher';
import { Pagination, User } from '@supabase/supabase-js';

export type AdminUsersResponse = { users: User[]; aud: string } & Pagination;

export const getAdminUsers = async () => {
    const cookie = await cookies();
    return await fetcher<AdminUsersResponse>(`${API_URL}/admin/user/all`, {
        headers: { Cookie: cookie.toString() },
    });
};
