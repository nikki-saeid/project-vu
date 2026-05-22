import { createResendServer } from '@/lib/resend/server';

export const emailRepository = {
    // get business by user id or create if not exists
    send: async function (from: string, to: string[], subject: string, html: string) {
        const resend = await createResendServer();

        const { data, error } = await resend.emails.send({ from, to, subject, html });

        if (error) throw error;

        return data;
    },
};
