import P from '@/components/typography/P';
import { Card, CardContent } from '@/components/ui/card';
import { IconCardProps } from '@/lib/types/dashboard';
import StyledIcon from '../styled-icon';
import { cn } from '@/lib/utils/classes-merge';

export default function IconCard({ title, label, StyledIconProps }: IconCardProps) {
    return (
        <Card className="py-2.5">
            <CardContent className="px-2.5 flex items-center gap-2">
                <StyledIcon
                    Icon={StyledIconProps.Icon}
                    className={cn('size-9 bg-primary/5', StyledIconProps.className)}
                    IconProps={{ className: cn('size-5 text-primary', StyledIconProps.IconProps?.className) }}
                />
                <div className="flex flex-col">
                    <P className="text-xs text-muted-foreground">{label}</P>
                    <P className="text-sm font-medium">{title}</P>
                </div>
            </CardContent>
        </Card>
    );
}
