import { type Icon as TablerIcon } from '@tabler/icons-react';

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StyledIcon from '../styled-icon';
import P from '../typography/P';

type DataCardProps = {
    title: string;
    description: string;
    value: string;
    badge?: React.ReactNode;
    Icon: TablerIcon;
};

export default function DataCard({ title, description, value, badge, Icon }: DataCardProps) {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardDescription className="flex items-center gap-1">
                    <StyledIcon Icon={Icon} className="bg-primary/5" IconProps={{ className: 'text-primary' }} />
                    <P>{title}</P>
                </CardDescription>

                <CardTitle className="text-2xl font-semibold tabular-nums">{value}</CardTitle>
                {badge && <CardAction>{badge}</CardAction>}
            </CardHeader>
            <CardFooter>
                <P className="text-muted-foreground">{description}</P>
            </CardFooter>
        </Card>
    );
}
