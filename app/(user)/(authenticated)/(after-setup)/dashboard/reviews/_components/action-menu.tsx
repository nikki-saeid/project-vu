'use client';

import ReviewResendRequestDialog from '@/components/review-ui/review-resend-request-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import { useState } from 'react';

type ActionMenuProps = {
    reviewId: string;
}

export default function ActionMenu({ reviewId }: ActionMenuProps) {
    // ----------- EditPageDialog
    const [open, setOpen] = useState(false);

    // ----------- BusinessCardDialog
    const [resendOpen, setResendOpen] = useState(false);

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
                        <DropdownMenuItem className="text-sm" onClick={() => setResendOpen(true)}>
                            Resend request email
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <ReviewResendRequestDialog open={resendOpen} setOpen={setResendOpen} reviewId={reviewId} />
        </>
    );
}
