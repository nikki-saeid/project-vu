import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StyledIcon from '../styled-icon';
import P from '../typography/P';
import { DataCardProps } from '@/lib/types/dashboard';
import { cn } from '@/lib/utils/classes-merge';

export default function DataCard({ title, description, label, badge, StyledIconProps }: DataCardProps) {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardDescription className="flex items-center gap-1">
                    <StyledIcon
                        Icon={StyledIconProps.Icon}
                        className={cn('size-9 bg-primary/5', StyledIconProps.className)}
                        IconProps={{ className: cn('size-5 text-primary', StyledIconProps.IconProps?.className) }}
                    />
                    <P>{label}</P>
                </CardDescription>

                <CardTitle className="text-2xl font-semibold tabular-nums">{title}</CardTitle>
                {badge && <CardAction>{badge}</CardAction>}
            </CardHeader>
            {description && (
                <CardFooter>
                    <P className="text-muted-foreground">{description}</P>
                </CardFooter>
            )}
        </Card>
    );
}
