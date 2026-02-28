import Logo from '@/components/logo';
import LucideIcon from '@/components/lucide-icon';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function SignUpSuccess() {
    return (
        <div>
            <Logo className="mx-auto mb-6" />
            <Card>
                <CardHeader>
                    <CardTitle>
                        <CardTitle className="flex items-center gap-2">
                            <LucideIcon Icon={Check} size="lg" color="success" />
                            <H3 className="text-primary">Thank you for signing up!</H3>
                        </CardTitle>
                    </CardTitle>
                    <CardDescription>Check your email to confirm</CardDescription>
                </CardHeader>
                <CardContent>
                    <P>You&apos;ve successfully signed up. Please check your email to confirm your account before signing in.</P>
                </CardContent>
            </Card>
        </div>
    );
}
