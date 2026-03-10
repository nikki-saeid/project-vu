'use server';

import { API_URL } from '@/lib/constants/urls';
import { Business } from '@/lib/types/db';
import { cookies } from 'next/headers';
import { fetcher } from '../../helpers/fetcher';
import { uploadLogo } from './file-upload';

// private api fetcher for user
export const getUserBusiness = async () => {
    const cookie = await cookies();
    return await fetcher<Business>(`${API_URL}/user/business`, {
        headers: { Cookie: cookie.toString() },
    });
};

// private api fetcher for user
export const updateUserBusiness = async (business: Partial<Business> & { logo?: FormData }) => {
    let logo_url: string | undefined;
    if (business.logo) {
        const response = await uploadLogo(business.logo);
        logo_url = response?.logo_url;
        if (!logo_url) {
            throw new Error('Failed to upload logo');
        }
    }

    const cookie = await cookies();
    const response = await fetcher<Business>(`${API_URL}/user/business`, {
        method: 'PUT',
        headers: { Cookie: cookie.toString() },
        body: JSON.stringify({
            name: business.name,
            type: business.type,
            description: business.description,
            phone: business.phone,
            website_url: business.website_url,
            instagram_url: business.instagram_url,
            facebook_url: business.facebook_url,
            x_url: business.x_url,
            logo_url: logo_url ?? business.logo_url,
        }),
    });
    return response;
};
