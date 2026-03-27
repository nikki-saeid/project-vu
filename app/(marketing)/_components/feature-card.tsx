import StyledIcon from '@/components/styled-icon';
import H3 from '@/components/typography/H3';
import P from '@/components/typography/P';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import type { Icon as IconType } from '@tabler/icons-react';

type FeatureCardProps = {
    Icon: IconType;
    title: string;
    subTitle: string;
    description: string;
};

export default function FeatureCard({ Icon, title, description, subTitle }: FeatureCardProps) {
    return (
        <Card className="shadow-none relative overflow-hidden">
            <CardContent className="z-1 flex flex-col items-center">
                <StyledIcon Icon={Icon} className="bg-primary/5 size-10" IconProps={{ className: 'text-primary size-5' }} />

                <H3 className="text-lg font-semibold text-foreground mt-4  leading-5">{title}</H3>

                <P className="text-md text-center text-foreground leading-6 mt-3">{subTitle}</P>

                <P className="text-md text-center text-foreground leading-6">{description}</P>
            </CardContent>
        </Card>
    );
}
