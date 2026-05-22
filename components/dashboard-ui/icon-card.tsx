import { Card, CardContent } from '@/components/ui/card';
import { IconCardProps } from '@/lib/types/dashboard';
import StyledIconTitle from '../styled-icon-title';

export default function IconCard({ title, label, StyledIconProps, Icon }: IconCardProps) {
    return (
        <Card className="py-2.5">
            <CardContent className="px-2.5 flex items-center gap-2">
                <StyledIconTitle Icon={Icon} StyledIconProps={StyledIconProps} label={label} title={title} />
            </CardContent>
        </Card>
    );
}
