'use client';

import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import PriceForm from '../../../../../components/admin-ui/price-form';

export default function PriceFormDialog() {
    const [open, setOpen] = useState(false);

    return (
        <DialogForm
            trigger={
                <Button variant="default">
                    <IconPlus /> Add pricing
                </Button>
            }
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            )}
            id="price-form"
            form={(id, setIsLoading) => <PriceForm id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
            title="Add pricing"
            open={open}
            onOpenChange={setOpen}
        />
    );
}
