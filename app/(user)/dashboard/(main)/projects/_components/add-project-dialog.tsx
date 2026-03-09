'use client';

import DialogForm from '@/components/dialog-form';
import ProjectForm from '@/components/project-ui/project-form';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AddProjectDialog() {
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
                    <IconPlus /> Add Project
                </Button>
            }
            action={(id, isLoading) => (
                <Button type="submit" form={id} disabled={isLoading}>
                    {isLoading ? 'Adding project...' : 'Add Project'}
                </Button>
            )}
            id="add-project"
            form={(id, setIsLoading) => <ProjectForm id={id} setIsLoading={setIsLoading} onSuccess={() => onOpenChange(false)} />}
            title="Add Project"
            open={open}
            onOpenChange={onOpenChange}
        />
    );
}
