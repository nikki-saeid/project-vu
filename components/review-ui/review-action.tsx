'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Review } from '@/lib/types/db';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import DialogForm from '../dialog-form';
import ReviewDeleteForm from './review-delete-form';

export default function ReviewAction({ review }: { review: Review }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-xs" className="rounded-full">
                        <IconDotsVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-35">
                    <DropdownMenuItem variant="destructive" onSelect={() => setDeleteDialogOpen(true)}>
                        <IconTrash className="size-4 " />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogForm
                title="Delete review"
                action={(id, isLoading) => (
                    <Button type="submit" variant="destructive" form={id} disabled={isLoading}>
                        {isLoading ? 'Deleting review...' : 'Delete review'}
                    </Button>
                )}
                form={(id, setIsLoading) => (
                    <ReviewDeleteForm id={id} setIsLoading={setIsLoading} onSuccess={() => setDeleteDialogOpen(false)} />
                )}
                id={review.id}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            />
        </>
    );
}
