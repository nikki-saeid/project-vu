import { API_URL } from '@/lib/constants/urls';
import { Business } from '@/lib/types/db';
import { cookies } from 'next/headers';

export const getUserBusiness = async () => {
    try {
        const cookie = await cookies();
        const response = await fetch(`${API_URL}/user/business`, {
            headers: {
                Cookie: cookie.toString(),
            },
        });

        if (!response.ok) {
            console.log('error status:', response.status);
            return null;
        }

        return (await response.json()) as Business;
    } catch (error) {
        console.log(error);
    }
};
