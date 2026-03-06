'use server';
import { LogoUploadResponse } from '@/app/api/files/logo/route';
import { cookies } from 'next/headers';
import { API_URL } from '../constants/urls';
import { fetcher } from '../helpers/fetcher';

export const uploadLogo = async (logo: FormData) => {
    const cookie = await cookies();
    return await fetcher<LogoUploadResponse>(`${API_URL}/files/logo`, {
        headers: { Cookie: cookie.toString() },
        method: 'POST',
        body: logo,
    });
};
