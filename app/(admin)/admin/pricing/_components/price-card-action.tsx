'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconDotsVertical, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import Stripe from 'stripe';
import PriceForm from '../../../../../components/admin-ui/price-form';
import DialogForm from '../../../../../components/dialog-form';

export default function PriceCardAction({ price }: { price: Stripe.Price }) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);

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
                    <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
                        <IconEdit className="size-4" />
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogForm
                title="Edit Price"
                action={(id, isLoading) => (
                    <Button type="submit" form={id} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                )}
                form={(id, setIsLoading) => (
                    <PriceForm id={id} price={price} setIsLoading={setIsLoading} onSuccess={() => setEditDialogOpen(false)} />
                )}
                id="edit-price"
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
            />
        </>
    );
}
