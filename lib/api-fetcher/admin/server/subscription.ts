import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { Subscription } from '@/lib/types/db';
import { cookies } from 'next/headers';

export const adminGetActiveSubscriptions = async () => {
    const cookie = await cookies();
    const response = await fetcher<Subscription[]>(`${API_URL}/admin/subscription/active/all`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};
