'use client';

import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';
import ReviewResendRequestForm from './review-resend-request-form';

type ReviewResendRequestDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    reviewId: string;
};

export default function ReviewResendRequestDialog({ open, setOpen, reviewId }: ReviewResendRequestDialogProps) {
    return (
        <DialogForm
            title="Resend request email"
            id={reviewId}
            open={open}
            onOpenChange={setOpen}
            form={(id, setIsLoading) => <ReviewResendRequestForm id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Resending...' : 'Resend request email'}
                </Button>
            )}
        />
    );
}
