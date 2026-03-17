import StyledIcon from '@/components/styled-icon';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import type { Icon as IconType } from '@tabler/icons-react';

type FeatureCardProps = {
    Icon: IconType;
    title: string;
    description: string;
};

export default function FeatureCard({ Icon, title, description }: FeatureCardProps) {
    return (
        <Card className="border-0">
            <CardContent>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <StyledIcon Icon={Icon} />
                    <span>{title}</span>
                </div>
                <CardDescription>
                    <p className="mt-2 text-xs">{description}</p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}
