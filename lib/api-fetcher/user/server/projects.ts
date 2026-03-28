'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import type { ProjectWithImages } from '@/lib/types/api';
import { cookies } from 'next/headers';

export const getUserProjects = async () => {
    const cookie = await cookies();
    const response = await fetcher<ProjectWithImages[]>(`${API_URL}/user/projects/many`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data ?? [];
};

export const getPublicProjectsBySlug = async (slug: string) => {
    const cookie = await cookies();
    const response = await fetcher<ProjectWithImages[]>(`${API_URL}/public/projects/${slug}`, {
        headers: { Cookie: cookie.toString() },
    });
    return response.data;
};
