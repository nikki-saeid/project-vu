'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { Stripe } from 'stripe';

export const getCheckoutSession = async (plan: string) => {
    const response = await fetcher<Stripe.Checkout.Session>(`${API_URL}/stripe/checkout-session/${plan}`);
    return response.data;
};

export const cancelSubscription = async (id: string) => {
    const response = await fetcher<Stripe.Checkout.Session>(`${API_URL}/stripe/subscription/${id}/cancel`, {
        method: 'POST',
    });
    return response;
};

export const resumeSubscription = async (id: string) => {
    const response = await fetcher<Stripe.Checkout.Session>(`${API_URL}/stripe/subscription/${id}/resume`, {
        method: 'POST',
    });
    return response;
};
