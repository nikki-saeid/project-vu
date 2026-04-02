'use client';

import DialogForm from '@/components/dialog-form';
import SubscriptionCancelForm from '@/components/subscription-ui/subscription-cancel-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function CancelSubscriptionDialog() {
    const [open, setOpen] = useState(false);

    return (
        <DialogForm
            title="Cancel subscription"
            id="cancel-subscription"
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className="font-light text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                >
                    Cancel subscription
                </Button>
            }
            form={(id, setIsLoading) => <SubscriptionCancelForm
                 id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
            action={(id, isLoading) => (
                <Button type="submit" variant="destructive" form={id} disabled={isLoading}>
                    {isLoading ? 'Canceling...' : 'Cancel subscription'}
                </Button>
            )}
        />
    );
}
