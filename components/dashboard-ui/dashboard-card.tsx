import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card';
import { FieldDescription, FieldLabel } from '@/components/ui/field';
import type { DashboardCardProps } from '@/lib/types/dashboard';

export default function DashboardCard({ title, description, children, badge }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <FieldLabel>{title}</FieldLabel>
                <FieldDescription>{description}</FieldDescription>
                {badge && <CardAction>{badge}</CardAction>}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
