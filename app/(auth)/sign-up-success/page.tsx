import Logo from '@/components/logo';
import StyledIcon from '@/components/styled-icon';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IconCheck } from '@tabler/icons-react';

export default function SignUpSuccess() {
    return (
        <div>
            <Logo className="mx-auto mb-6" />
            <Card>
                <CardHeader>
                    <CardTitle>
                        <CardTitle className="flex items-center gap-2">
                            <StyledIcon IconProps={{ className: 'text-success' }} className="bg-success/5" Icon={IconCheck} />
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
