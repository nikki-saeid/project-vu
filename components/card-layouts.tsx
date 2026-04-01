'use client';

import type { CardLayoutsProps } from '@/lib/types/forms';
import H3 from './typography/H3';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function CardLayouts({ action, children, title, description }: CardLayoutsProps) {
    return (
        <Card className="shadow-none">
            {action && description && (
                <CardHeader>
                    {action && (
                        <CardTitle>
                            <H3>{title}</H3>
                        </CardTitle>
                    )}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent>{children}</CardContent>
            <CardFooter className="flex justify-end">{action}</CardFooter>
        </Card>
    );
}
