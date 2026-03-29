import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';
import Container from '@/components/ui/container';
import Paragraph from '../_components/paragraph';

export default function PrivacyPolicy() {
    return (
        <Container>
            <main className="flex flex-col gap-10 py-10">
                <div className="flex flex-col gap-2">
                    <H1 className="text-2xl">Terms & Conditions</H1>
                    <P className="leading-6 text-xs">Effective Date: 29/03/2036</P>
                </div>

                <P className="leading-6">
                    By using Project Vu’s platform, you agree to the following terms and conditions. Please read them carefully.
                </P>

                <Paragraph
                    header="1. Using the Platform"
                    title="By accessing or using our platform:"
                    bullets={[
                        'You must be at least 18 years old to create a profile',
                        'You are responsible for the accuracy of the information, photos, and media you upload',
                        'You must have the legal rights to use and share any content you display on your profile',
                    ]}
                />

                <Paragraph
                    header="2. Subscriptions and Payments"
                    title="Access to the platform requires an active subscription:"
                    bullets={[
                        'We offer monthly, six-month, and annual subscription plans',
                        'Subscription fees are billed based on the selected plan and may change over time',
                        'You may cancel your subscription according to the terms provided on your plan page',
                    ]}
                />

                <Paragraph
                    header="3. User Content"
                    title="Regarding content you upload to the platform:"
                    bullets={[
                        'You retain ownership of all content you upload',
                        'You grant Project Vu a license to display your content for the purpose of operating and promoting the platform',
                        'We reserve the right to remove any content that violates these Terms or applicable laws',
                    ]}
                />

                <Paragraph
                    header="4. Platform Limitations"
                    title="When using the platform:"
                    bullets={[
                        'Project Vu is not responsible for interactions, agreements, or disputes between users and clients',
                        'We do not guarantee the accuracy, completeness, or reliability of user profiles',
                    ]}
                />

                <Paragraph
                    header="5. Privacy"
                    title="Your use of the platform is also governed by our Privacy Policy, which explains how we collect, use, and protect your data."
                />

                <Paragraph
                    header="6. Modifications"
                    title="We may update these Terms at any time. Any changes will be posted on this page with the updated effective date."
                />

                <Paragraph
                    header="7. Limitation of Liability"
                    title="To the maximum extent permitted by law:"
                    bullets={[
                        'Project Vu is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform',
                    ]}
                />

                <Paragraph
                    header="8. Contact"
                    title="If you have questions about these Terms, please contact us at: support@projectvu.com.au"
                />
            </main>
        </Container>
    );
}
