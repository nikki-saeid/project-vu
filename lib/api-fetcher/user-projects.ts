'use server';

import { API_URL } from '@/lib/constants/urls';
import { cookies } from 'next/headers';
import { fetcher } from '../helpers/fetcher';
import { Project } from '../types/db';
import type { ProjectCreateInput } from '@/lib/validators/user/project';
import { revalidatePath } from 'next/cache';

// private api fetcher for user
export const getUserProjects = async () => {
    const cookie = await cookies();
    return await fetcher<Project[]>(`${API_URL}/user/projects/all`, {
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
    revalidatePath('/dashboard', 'layout');
    return response;
}
