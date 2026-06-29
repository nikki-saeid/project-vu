import fs from 'fs';
import path from 'path';
import { emailRepository } from '../repositories/email.repository';

// review request email
const reviewEmailFilePath = path.join(process.cwd(), 'lib/resend/templates/review-request.html');
const reviewRequestTemplate = fs.readFileSync(reviewEmailFilePath, 'utf8');

// welcome email
const welcomeEmailFilePath = path.join(process.cwd(), 'lib/resend/templates/welcome.html');
const welcomeTemplate = fs.readFileSync(welcomeEmailFilePath, 'utf8');

// delete account email
const deleteAccountEmailFilePath = path.join(process.cwd(), 'lib/resend/templates/account-deleted.html');
const deleteAccountTemplate = fs.readFileSync(deleteAccountEmailFilePath, 'utf8');

export const emailService = {
    // get business by user id or create if not exists
    sendReviewRequest: async function (reviewId: string, email: string, businessName: string, clientName: string, requestComment?: string) {
        const optionalBlock = requestComment
            ? `
                <div
                    style="
                        background: #f9fafb;
                        border: 1px solid #e5e7eb;
                        border-radius: 10px;
                        padding: 14px 16px;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #374151;
                    "
                >
                    ${requestComment}
                </div>
            `
            : '';

        const html = reviewRequestTemplate
            .replaceAll('{{BUSINESS_NAME}}', businessName)
            .replaceAll('{{CLIENT_NAME}}', clientName.toUpperCase())
            .replaceAll('{{OPTIONAL_BLOCK}}', optionalBlock)
            .replaceAll('{{REVIEW_URL}}', `${process.env.NEXT_PUBLIC_BASE_URL}/review/${reviewId}`);

        return await emailRepository.send(`${businessName} <noreply@projectvu.com.au>`, [email], "We'd love your feedback", html);
    },

    sendWelcomeEmail: async function (email: string, full_name: string) {
        const html = welcomeTemplate
            .replaceAll('{{DASHBOARD_URL}}', process.env.NEXT_PUBLIC_BASE_URL + '/login')
            .replaceAll('{{USER_NAME}}', full_name);

        return await emailRepository.send(`Project Vu <noreply@projectvu.com.au>`, [email], 'Welcome to Project Vu', html);
    },

    sendDeleteAccountEmail: async function (email: string, full_name: string) {
        const html = deleteAccountTemplate.replaceAll('{{USER_NAME}}', full_name);

        return await emailRepository.send(
            `Project Vu <noreply@projectvu.com.au>`,
            [email],
            'You have permanentely deleted your account',
            html,
        );
    },
};
