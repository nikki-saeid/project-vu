'use server';

import { cookies } from 'next/headers';
import type { ProjectWithImages } from '@/lib/types/api';
import { API_URL } from '../../constants/urls';
import { fetcher } from '../../helpers/fetcher';
import { Business } from '../../types/db';

// public api fetcher for user
export const getPublicBusinessBySlug = async (slug: string) => {
    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/public/business/${slug}`, {
        headers: { Cookie: cookie.toString() },
    });
    return response.data;
};

export const getPublicProjectsBySlug = async (slug: string) => {
    const cookie = await cookies();
    const response = await fetcher<ProjectWithImages[]>(`${API_URL}/public/projects/${slug}`, {
        headers: { Cookie: cookie.toString() },
    });
    return response.data;
};
