import Stripe from 'stripe';

export async function createsStripeServer() {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
        throw new Error('Missing STRIPE_SECRET_KEY');
    }
    return new Stripe(secret, {
        apiVersion: '2026-03-25.dahlia',
        typescript: true,
    });
}
