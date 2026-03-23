'use server';

import type { ProjectWithImages } from '@/lib/types/api';
import { API_URL } from '../../constants/urls';
import { fetcher } from '../../helpers/fetcher';
import { Business } from '../../types/db';
import { cookies } from 'next/headers';

// public api fetcher for user
export const getPublicBusinessBySlug = async (slug: string, isUserView?: boolean) => {
    const cookie = await cookies();
    console.log("----------------------- ok ok");
    
    return await fetcher<Business>(
        `${API_URL}/public/business/${slug}?user_view=${isUserView}`,
        isUserView ? { headers: { Cookie: cookie.toString() } } : {},
    );
};

export const getPublicProjectsBySlug = async (slug: string, isUserView?: boolean) => {
    const cookie = await cookies();
    return await fetcher<ProjectWithImages[]>(
        `${API_URL}/public/projects/${slug}?user_view=${isUserView}`,
        isUserView ? { headers: { Cookie: cookie.toString() } } : {},
    );
};
