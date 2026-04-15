'use client';

import type { CardFormProps } from '@/lib/types/forms';
import { useState } from 'react';
import H3 from './typography/H3';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils/classes-merge';

export default function CardForm({ action, id, form, title, description, className }: CardFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Card className={cn('shadow-none', className)}>
            <CardHeader>
                <CardTitle>
                    <H3>{title}</H3>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{form(id, setIsLoading)}</CardContent>
            <CardFooter className="flex justify-end">{action(id, isLoading)}</CardFooter>
        </Card>
    );
}
