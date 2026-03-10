'use server';

import type { ProjectWithImages } from '@/lib/types/api';
import { API_URL } from '../../constants/urls';
import { fetcher } from '../../helpers/fetcher';
import { Business } from '../../types/db';

// public api fetcher for user
export const getPublicBusinessBySlug = async (slug: string) => {
    return await fetcher<Business>(`${API_URL}/public/business/${slug}`, {});
};

export const getPublicProjectsBySlug = async (slug: string) => {
    return await fetcher<ProjectWithImages[]>(`${API_URL}/public/projects/${slug}`, {});
};
