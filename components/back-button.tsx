'use client';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type BackButtonProps = {
    url?: string;
};

export default function BackButton({ url }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (url) {
            router.push(url);
        } else {
            router.back();
        }
    };

    return (
        <Button onClick={handleBack} variant="outline" size="icon-sm" className="rounded-full">
            <IconArrowLeft />
        </Button>
    );
}
