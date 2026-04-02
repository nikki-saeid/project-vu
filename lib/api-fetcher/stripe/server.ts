'use server';

import { API_URL } from '@/lib/constants/urls';
import { fetcher } from '@/lib/helpers/fetcher';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

export const getInvoiceList = async (stripeCustomerId: string) => {
    const cookie = await cookies();
    const response = await fetcher<Stripe.Invoice[]>(`${API_URL}/stripe/invoice/many/${stripeCustomerId}`, {
        headers: { Cookie: cookie.toString() },
    });

    return response.data;
};
