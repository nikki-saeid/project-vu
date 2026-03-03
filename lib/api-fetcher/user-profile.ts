import { API_URL } from '@/constants/urls';
import { Profile } from '@/types/db';
import { cookies } from 'next/headers';

export const getUserProfile = async () => {
    try {
        const cookie = await cookies();
        const response = await fetch(`${API_URL}/user/profile`, {
            headers: {
                Cookie: cookie.toString(),
            },
        });

        if (!response.ok) {
            console.log('error status:', response.status);
            return null;
        }

        return (await response.json()) as Profile;
    } catch (error) {
        console.log(error);
    }
};
