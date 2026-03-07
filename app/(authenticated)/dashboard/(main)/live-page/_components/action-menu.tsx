'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUser } from '@/lib/contexts/user-context';
import { IconDotsVertical, IconEdit, IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import EditDialog from './edit-dialog';

export default function ActionMenu() {
    const { business } = useUser();
    const slug = business?.slug;
    const livePageHref = slug ? `/b/${slug}` : null;
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-8 rounded-full">
                        <IconDotsVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
                        <IconEdit className="size-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled={!livePageHref}>
                        {livePageHref ? (
                            <Link
                                href={livePageHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <IconExternalLink className="size-4" />
                                Show live page
                            </Link>
                        ) : (
                            <span className="flex items-center gap-2">
                                <IconExternalLink className="size-4" />
                                Show live page
                            </span>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </>
    );
}
