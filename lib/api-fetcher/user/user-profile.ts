'use server';

import { API_URL } from '@/lib/constants/urls';
import { cookies } from 'next/headers';
import { Profile } from '../../types/db';
import { fetcher } from '../../helpers/fetcher';

export const getUserProfile = async () => {
    const cookie = await cookies();
    return await fetcher<Profile>(`${API_URL}/user/profile`, {
        headers: { Cookie: cookie.toString() },
    });
};

export async function updateUserProfile(profile: Partial<Profile>) {
    const cookie = await cookies();
    return await fetcher<Profile>(`${API_URL}/user/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Cookie: cookie.toString() },
        body: JSON.stringify(profile),
    });
}
