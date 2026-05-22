import fs from 'fs';
import path from 'path';
import { emailRepository } from '../repositories/email.repository';

const filePath = path.join(process.cwd(), 'lib/resend/templates/review-request.html');
const reviewRequestTemplate = fs.readFileSync(filePath, 'utf8');

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

        console.log(html);

        return await emailRepository.send(`${businessName} <noreply@projectvu.com.au>`, [email], "We'd love your feedback", html);
    },
};
