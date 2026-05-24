'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import Stripe from 'stripe';

export const adminCreatePrice = async (body: string) => {
    const response = await fetcher<Stripe.Price>(`${API_URL}/admin/pricing`, {
        method: 'POST',
        body,
    });
    return response;
};

export const adminUpdatePrice = async (id: string, body: string) => {
    const response = await fetcher<Stripe.Price>(`${API_URL}/admin/pricing/${id}`, {
        method: 'PUT',
        body,
    });
    return response;
};

export async function adminDeletePrice(id: string) {
    const response = await fetcher<void>(`${API_URL}/admin/pricing/${id}`, {
        method: 'DELETE',
    });
    return response;
}
