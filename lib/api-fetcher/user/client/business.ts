'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { Business, PageStatusEnum } from '@/lib/types/db';
import { cookies } from 'next/dist/server/request/cookies';

export const updateUserBusiness = async (formdata: FormData) => {
    const response = await fetcher<Business>(`${API_URL}/user/business`, {
        method: 'PUT',
        body: formdata,
    });
    return response;
};

export const updatePageStatus = async (status: PageStatusEnum) => {
    const response = await fetcher<Business>(`${API_URL}/user/business/page-status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
    return response;
};

export const updateOnboardingStatus = async (is_onboarded: boolean) => {
    const response = await fetcher<Business>(`${API_URL}/user/business/is-onboarded`, {
        method: 'PUT',
        body: JSON.stringify({ is_onboarded }),
    });
    return response.data;
};
