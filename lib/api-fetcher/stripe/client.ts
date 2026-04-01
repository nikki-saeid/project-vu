'use client';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { Stripe } from 'stripe';

export const getCheckoutSession = async (plan: string) => {
    const response = await fetcher<Stripe.Checkout.Session>(`${API_URL}/stripe/checkout-session/${plan}`);
    return response.data;
};
