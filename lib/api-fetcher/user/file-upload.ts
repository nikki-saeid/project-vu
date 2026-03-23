'use server';
import type { ProjectImageResponse } from '@/lib/types/api';
import { cookies } from 'next/headers';
import { API_URL } from '../../constants/urls';
import { fetcher } from '../../helpers/fetcher';

export const uploadProjectImages = async (formData: FormData) => {
    const cookie = await cookies();
    return await fetcher<ProjectImageResponse[]>(`${API_URL}/files/project-images`, {
        headers: { Cookie: cookie.toString() },
        method: 'POST',
        body: formData,
    });
};
