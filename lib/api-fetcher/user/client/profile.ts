'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { User } from '@supabase/supabase-js';

export async function updateUser(body: { full_name: string }) {
    return await fetcher<User | null>(`${API_URL}/user`, {
        method: 'PUT',
        body: JSON.stringify(body),
    });
}

export async function deleteUser() {
    return await fetcher<void>(`${API_URL}/user`, {
        method: 'DELETE',
    });
}
