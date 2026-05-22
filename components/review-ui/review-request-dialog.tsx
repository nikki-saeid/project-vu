'use client';

import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';
import { IconSend } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ReviewRequestForm from './review-request-form';

export default function RequestReviewDialog() {
    const searchParams = useSearchParams();
    const isOpen = searchParams.get('open') === 'true';
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(isOpen);

    const onOpenChange = (open: boolean) => {
        setOpen(open);
        if (isOpen && !open) {
            router.replace(pathname);
        }
    };

    return (
        <DialogForm
            trigger={
                <Button variant="default">
                    <IconSend /> Request a review
                </Button>
            }
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Sending request...' : 'Send request'}
                </Button>
            )}
            id="review-request-form"
            form={(id, setIsLoading) => <ReviewRequestForm id={id} setIsLoading={setIsLoading} onSuccess={() => onOpenChange(false)} />}
            title="Request a review"
            open={open}
            onOpenChange={onOpenChange}
        />
    );
}
