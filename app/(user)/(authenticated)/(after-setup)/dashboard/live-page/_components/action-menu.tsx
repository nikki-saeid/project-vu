'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import { useState } from 'react';
import EditPageDialog from './edit-page-dialog';
import AddProjectButtonLink from '@/components/project-ui/add-project-button-link';

export default function ActionMenu() {
    const [openEditPage, setOpenEditPage] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-xs" className="rounded-full" onClick={() => setOpen(true)} aria-label="Open menu">
                        <IconDotsVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setOpenEditPage(true)}>Edit page</DropdownMenuItem>

                        <AddProjectButtonLink>
                            <DropdownMenuItem>Add project</DropdownMenuItem>
                        </AddProjectButtonLink>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditPageDialog open={openEditPage} setOpen={setOpenEditPage} />
        </>
    );
}
