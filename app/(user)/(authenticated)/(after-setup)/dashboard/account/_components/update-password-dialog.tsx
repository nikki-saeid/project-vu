'use client';

import DialogForm from '@/components/dialog-form';
import UpdatePasswordForm from '@/components/profile-ui/update-password-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { IconPencil } from '@tabler/icons-react';

export default function UpdatePasswordDialog() {
    const [open, setOpen] = useState(false);

    return (
        <DialogForm
            trigger={
                <Button variant="outline" size="sm" type="button">
                    <IconPencil />
                    Update password
                </Button>
            }
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Updating password...' : 'Update password'}
                </Button>
            )}
            id="update-password-form"
            form={(id, setIsLoading) => <UpdatePasswordForm id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
            title="Update password"
            open={open}
            onOpenChange={setOpen}
        />
    );
}
