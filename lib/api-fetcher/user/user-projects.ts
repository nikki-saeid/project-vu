'use server';

import type { ProjectWithImages } from '@/lib/types/api';
import { API_URL } from '@/lib/constants/urls';
import type { ProjectCreateInput } from '@/lib/validators/user/project';
import { cookies } from 'next/headers';
import { fetcher } from '../../helpers/fetcher';
import { Project } from '../../types/db';

// private api fetcher for user
export const getUserProjects = async () => {
    const cookie = await cookies();
    return await fetcher<ProjectWithImages[]>(`${API_URL}/user/projects/many`, {
        headers: { Cookie: cookie.toString() },
    });
};

// private api fetcher
export async function createProject(input: ProjectCreateInput): Promise<Project> {
    const cookie = await cookies();
    const response = await fetcher<Project>(`${API_URL}/user/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie.toString(),
        },
        body: JSON.stringify(input),
    });
    return response;
}

export async function updateProject(input: ProjectCreateInput, id: string): Promise<Project> {
    const cookie = await cookies();
    const response = await fetcher<Project>(`${API_URL}/user/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie.toString(),
        },
        body: JSON.stringify(input),
    });
    return response;
}

export async function deleteProject(id: string): Promise<void> {
    const cookie = await cookies();
    await fetcher<void>(`${API_URL}/user/projects/${id}`, {
        method: 'DELETE',
        headers: { Cookie: cookie.toString() },
    });
}