'use client';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type BackButtonProps = {
    url?: string;
    isIcon?: boolean;
};

export default function BackButton({ url, isIcon = true }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (url) {
            router.push(url);
        } else {
            router.back();
        }
    };

    return isIcon ? (
        <Button onClick={handleBack} variant="outline" size="icon-sm" className="rounded-full">
            <IconArrowLeft />
        </Button>
    ) : (
        <Button onClick={handleBack} size="sm" variant="outline" type="submit">
            Back
        </Button>
    );
}
