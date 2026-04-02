import P from '@/components/typography/P';
import { Card, CardContent } from '@/components/ui/card';
import { IconCardProps } from '@/lib/types/dashboard';
import StyledIcon from '../styled-icon';

export default function IconCard({ title, label, Icon }: IconCardProps) {
    return (
        <Card className="py-2.5">
            <CardContent className="px-2.5 flex items-center gap-2">
                <StyledIcon Icon={Icon} className="size-9 bg-primary/5" IconProps={{ className: 'size-5 text-primary' }} />
                <div className="flex flex-col">
                    <P className="text-xs text-muted-foreground">{label}</P>
                    <P className="text-sm">{title}</P>
                </div>
            </CardContent>
        </Card>
    );
}
