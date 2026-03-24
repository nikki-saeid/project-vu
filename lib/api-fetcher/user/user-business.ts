'use server';

import { API_URL } from '@/lib/constants/urls';
import { Business, PageStatusEnum } from '@/lib/types/db';
import { cookies } from 'next/headers';
import { fetcher } from '../../helpers/fetcher';

// *****  ------------------------------------------------------------------ WORKING
// private api fetcher for user
export const getUserBusiness = async () => {
    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/user/business`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};

// private api fetcher for user
// *****  ------------------------------------------------------------------ WORKING
export const updateUserBusiness = async (formdata: FormData) => {
    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/user/business`, {
        method: 'PUT',
        headers: { Cookie: cookie.toString() },
        body: formdata,
    });
    return response;
};

// *****  ------------------------------------------------------------------ WORKING
export const updatePageStatus = async (status: PageStatusEnum) => {
    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/user/business/page-status`, {
        headers: { Cookie: cookie.toString() },
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
    return response;
};
