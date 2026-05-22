'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { Project } from '@/lib/types/db';

export async function createProject(body: string) {
    const response = await fetcher<Project>(`${API_URL}/user/projects`, {
        method: 'POST',
        body,
    });
    return response;
}

export async function updateProject(body: string, id: string) {
    const response = await fetcher<Project>(`${API_URL}/user/projects/${id}`, {
        method: 'PUT',
        body,
    });
    return response;
}

export async function deleteProject(id: string) {
    const response = await fetcher<void>(`${API_URL}/user/projects/${id}`, {
        method: 'DELETE',
    });
    return response;
}
