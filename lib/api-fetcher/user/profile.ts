'use server';

import { API_URL } from '@/lib/constants/urls';
import { cookies } from 'next/headers';
import { fetcher } from '../../helpers/fetcher';
import { User } from '@supabase/supabase-js';

// *****  ------------------------------------------------------------------ WORKING
export async function updateUser(body: { full_name: string }) {
    const cookie = await cookies();
    return await fetcher<User | null>(`${API_URL}/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Cookie: cookie.toString() },
        body: JSON.stringify(body),
    });
}

// *****  ------------------------------------------------------------------ WORKING
export async function deleteUser() {
    const cookie = await cookies();
    return await fetcher<void>(`${API_URL}/user`, {
        method: 'DELETE',
        headers: { Cookie: cookie.toString() },
    });
}
