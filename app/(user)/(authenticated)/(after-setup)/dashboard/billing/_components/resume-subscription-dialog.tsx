'use client';

import DialogForm from '@/components/dialog-form';
import SubscriptionCancelForm from '@/components/subscription-ui/subscription-cancel-form';
import SubscriptionResumeForm from '@/components/subscription-ui/subscription-resume-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ResumeSubscriptionDialog() {
    const [open, setOpen] = useState(false);

    return (
        <DialogForm
            title="Resume subscription"
            id="resume-subscription"
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button size="sm" type="button">
                    Resume subscription
                </Button>
            }
            form={(id, setIsLoading) => <SubscriptionResumeForm id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Resuming...' : 'Resume subscription'}
                </Button>
            )}
        />
    );
}
