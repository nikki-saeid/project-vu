'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';

export async function sendWelcomeEmail(body: { full_name: string; email: string }) {
    return await fetcher<null>(`${API_URL}/email/welcome`, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}
