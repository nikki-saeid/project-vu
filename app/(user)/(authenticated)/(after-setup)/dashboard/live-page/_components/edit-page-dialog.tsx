'use client';

import BusinessForm from '@/components/business-ui/business-form';
import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconPencil } from '@tabler/icons-react';
import { useState } from 'react';

export default function EditPageDialog() {
    const [open, setOpen] = useState(false);

    return (
        <DialogForm
            trigger={
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon-xs" className="rounded-full" onClick={() => setOpen(true)}>
                            <IconPencil className="size-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit your page</TooltipContent>
                </Tooltip>
            }
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Saving profile...' : 'Save profile'}
                </Button>
            )}
            id="edit-page"
            form={(id, setIsLoading) => <BusinessForm id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
            title="Edit Page"
            open={open}
            onOpenChange={setOpen}
        />
    );
}
