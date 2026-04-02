import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import type { DashboardCardProps } from '@/lib/types/dashboard';

export default function DashboardCard({ title, description, children }: DashboardCardProps) {
    return (
        <Card>
            <CardContent>
                <Field>
                    <FieldLabel>{title}</FieldLabel>
                    <FieldDescription>{description}</FieldDescription>
                    {children}
                </Field>
            </CardContent>
        </Card>
    );
}
