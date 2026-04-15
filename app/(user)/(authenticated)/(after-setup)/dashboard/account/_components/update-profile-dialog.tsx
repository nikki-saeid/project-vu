'use client';

import DialogForm from '@/components/dialog-form';
import UpdateProfileForm from '@/components/profile-ui/update-profile-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { IconPencil } from '@tabler/icons-react';

export default function UpdateProfileDialog() {
    const [open, setOpen] = useState(false);

    return (
        <DialogForm
            trigger={
                <Button variant="outline" size="sm" type="button">
                    <IconPencil />
                    Update profile
                </Button>
            }
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Updating profile...' : 'Update profile'}
                </Button>
            )}
            id="update-password-form"
            form={(id, setIsLoading) => <UpdateProfileForm id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
            title="Update profile"
            open={open}
            onOpenChange={setOpen}
        />
    );
}
