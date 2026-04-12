'use client';

import AddProjectButtonLink from '@/components/project-ui/add-project-button-link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import EditPageDialog from './edit-page-dialog';

export default function ActionMenu() {
    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams();
    const isOpen = searchParams.get('open') === 'true';

    const router = useRouter();
    const pathname = usePathname();

    const onOpenChange = (open: boolean) => {
        if (!open) {
            router.replace(pathname); // remove ?open=true
        } else {
            router.replace(`${pathname}?open=true`);
        }
    };

    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-sm" className="rounded-full" onClick={() => setOpen(true)} aria-label="Open menu">
                        <IconDotsVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="text-sm" onClick={() => onOpenChange(true)}>
                            Edit page
                        </DropdownMenuItem>

                        <AddProjectButtonLink>
                            <DropdownMenuItem className="text-sm">Add project</DropdownMenuItem>
                        </AddProjectButtonLink>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditPageDialog open={isOpen} setOpen={onOpenChange} />
        </>
    );
}
