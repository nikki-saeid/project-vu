import ContactBagde from '@/components/contact-bagde';
import Logo from '@/components/logo';
import StyledIcon from '@/components/styled-icon';
import H3 from '@/components/typography/H3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IconX } from '@tabler/icons-react';

export default function Page() {
    return (
        <div className="flex flex-col gap-4 items-center">
            <Logo />
            <Card className="self-stretch shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <StyledIcon IconProps={{ className: 'text-red-500' }} className="bg-red-500/5" Icon={IconX} />
                        <H3 className="text-primary">Subscription failed</H3>
                    </CardTitle>
                    <CardDescription>Your subscription is not active. Please contact us at</CardDescription>
                </CardHeader>

                <CardContent>
                    <ContactBagde />
                </CardContent>
            </Card>
        </div>
    );
}
