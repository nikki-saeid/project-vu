'use server';

import { API_URL } from '@/lib/constants/urls';
import { cookies } from 'next/headers';
import { fetcher } from '../../helpers/fetcher';
import { User } from '@supabase/supabase-js';

export async function updateUser(body: { full_name: string }) {
    const cookie = await cookies();
    return await fetcher<User | null>(`${API_URL}/user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Cookie: cookie.toString() },
        body: JSON.stringify(body),
    });
}
