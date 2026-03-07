'use server';

import { cookies } from 'next/headers';
import { API_URL } from '../constants/urls';
import { fetcher } from '../helpers/fetcher';
import { Business, PageStatusEnum } from '../types/db';

export const updatePageStatus = async (status: PageStatusEnum) => {
    const cookie = await cookies();
    return await fetcher<Business>(`${API_URL}/user/business/page/status`, {
        headers: { Cookie: cookie.toString() },
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
};
