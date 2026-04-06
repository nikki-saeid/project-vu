'use client';

import BusinessForm from '@/components/business-ui/business-form';
import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';

type EditPageDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function EditPageDialog({ open, setOpen }: EditPageDialogProps) {
    return (
        <DialogForm
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
