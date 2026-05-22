import { Resend } from 'resend';

export async function createResendServer() {
    const secret = process.env.RESEND_API_KEY;
    if (!secret) {
        throw new Error('Missing RESEND_API_KEY');
    }
    return new Resend(process.env.RESEND_API_KEY);
}
