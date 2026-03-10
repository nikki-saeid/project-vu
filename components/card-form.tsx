import type { CardFormProps } from '@/lib/types/forms';
import { useState } from 'react';
import H3 from './typography/H3';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function CardForm({ action, id, form, title, description }: CardFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Card className="border-0">
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
