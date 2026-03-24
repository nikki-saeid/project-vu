'use server';

import type { ProjectWithImages } from '@/lib/types/api';
import { API_URL } from '@/lib/constants/urls';
import type { ProjectCreateInput } from '@/lib/validators/user/project';
import { cookies } from 'next/headers';
import { fetcher } from '../../helpers/fetcher';
import { Project } from '../../types/db';

// private api fetcher for user
// *****  ------------------------------------------------------------------ WORKING
export const getUserProjects = async () => {
    const cookie = await cookies();
    const response = await fetcher<ProjectWithImages[]>(`${API_URL}/user/projects/many`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data ?? [];
};

// private api fetcher
// *****  ------------------------------------------------------------------ WORKING
export async function createProject(formData: FormData) {
    const cookie = await cookies();
    const response = await fetcher<Project>(`${API_URL}/user/projects`, {
        method: 'POST',
        headers: {
            Cookie: cookie.toString(),
        },
        body: formData,
    });
    return response;
}

// *****  ------------------------------------------------------------------ WORKING
export async function updateProject(formData: FormData, id: string) {
    const cookie = await cookies();
    const response = await fetcher<Project>(`${API_URL}/user/projects/${id}`, {
        method: 'PUT',
        headers: {
            Cookie: cookie.toString(),
        },
        body: formData,
    });
    return response;
}

// *****  ------------------------------------------------------------------ WORKING
export async function deleteProject(id: string) {
    const cookie = await cookies();
    const response = await fetcher<void>(`${API_URL}/user/projects/${id}`, {
        method: 'DELETE',
        headers: { Cookie: cookie.toString() },
    });
    return response;
}
