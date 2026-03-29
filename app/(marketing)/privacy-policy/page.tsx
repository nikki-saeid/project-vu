import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';
import Container from '@/components/ui/container';
import Paragraph from '../_components/paragraph';

export default function PrivacyPolicy() {
    return (
        <Container>
            <main className="flex flex-col gap-10 py-10">
                <div className="flex flex-col gap-2">
                    <H1 className="text-2xl">Privacy Policy</H1>
                    <P className="leading-6 text-xs">Effective Date: 29/03/2036</P>
                </div>

                <P className="leading-6">
                    At Project Vu, we value your privacy and are committed to protecting your personal information. This Privacy Policy
                    explains how we collect, use, and store information when you use our platform.
                </P>

                <Paragraph
                    header="1. Information We Collect"
                    title="When you create a profile or use our platform, we may collect:"
                    bullets={[
                        'Name and contact details (email, phone number)',
                        'Professional information (business name, profession, project details)',
                        'Photos, videos, and other media you upload',
                        'Usage data (e.g., how you interact with our platform)',
                    ]}
                />

                <Paragraph
                    header="2. How We Use Your Information"
                    title="We use your information to:"
                    bullets={[
                        'Provide and improve our services',
                        'Display your profile to potential clients',
                        'Allow clients to contact you',
                        'Communicate important updates about our platform',
                    ]}
                />

                <Paragraph
                    header="3. Sharing Your Information"
                    title="We do not sell your personal information. We may share your information with:"
                    bullets={[
                        'Trusted third-party service providers (e.g., hosting, analytics, payment processors)',
                        'Law enforcement or regulatory authorities if required by law',
                    ]}
                />

                <Paragraph
                    header="4. Security"
                    title="We take reasonable measures to protect your data from unauthorized access, alteration, or loss."
                />

                <Paragraph
                    header="5. Your Choices"
                    title="You have the following choices regarding your information:"
                    bullets={['You can update or delete your profile at any time.', 'You can opt out of marketing communications.']}
                />

                <Paragraph
                    header="6. Children's Privacy"
                    title="Our platform is not intended for children under 18, and we do not knowingly collect information from them."
                />

                <Paragraph
                    header="7. Changes to This Policy"
                    title="We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date."
                />
                <Paragraph
                    header="8. Contact Us"
                    title="If you have questions about this Privacy Policy, please contact us at: support@projectvu.com.au"
                />
            </main>
        </Container>
    );
}
