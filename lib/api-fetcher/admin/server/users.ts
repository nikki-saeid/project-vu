'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { UsersWithPagination } from '@/lib/types/api';
import { cookies } from 'next/headers';

export const adminGetUsers = async (page: number) => {
    const cookie = await cookies();
    const response = await fetcher<UsersWithPagination>(`${API_URL}/admin/user/many?page=${page}`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};


