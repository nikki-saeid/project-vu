import StyledIcon from '@/components/styled-icon';
import H3 from '@/components/typography/H3';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import type { Icon as IconType } from '@tabler/icons-react';

type FeatureCardProps = {
    Icon: IconType;
    title: string;
    description: string;
};

export default function FeatureCard({ Icon, title, description }: FeatureCardProps) {
    return (
        <Card className="border-0 relative overflow-hidden">
            <CardContent className="z-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <StyledIcon Icon={Icon} className="bg-primary/5 size-10" IconProps={{ className: 'text-primary size-5' }} />
                    <H3 className="text-lg leading-5">{title}</H3>
                </div>
                <CardDescription>
                    <p className="mt-2 text-md text-foreground">{description}</p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}
