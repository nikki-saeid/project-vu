import AdminDisableUserForm from '@/components/admin-ui/admin-disable-user-form';
import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { adminGetUserBusiness } from '@/lib/api-fetcher/admin/users';
import type { User } from '@supabase/supabase-js';
import { IconAppWindow, IconDotsVertical, IconUserCheck, IconUserOff } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'sonner';

type ActionMenuProps = {
    user: User;
};

export default function ActionMenu({ user }: ActionMenuProps) {
    const [disableUserDialogOpen, setDisableUserDialogOpen] = useState(false);

    const handleGetUserBusinessSlug = async () => {
        const business = await adminGetUserBusiness(user.id);
        if (!business || business.page_status === 'draft') {
            toast.error('The user does not have a published page yet');
            return;
        }

        const slug = business.slug;
        const livePageHref = `/page/${slug}`;
        window.open(livePageHref, '_blank');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon-xs" className="rounded-full">
                    <IconDotsVertical className="size-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-35">
                <DropdownMenuItem onSelect={() => handleGetUserBusinessSlug()}>
                    <IconAppWindow />
                    View Page
                </DropdownMenuItem>
                {user.banned_until ? (
                    <DropdownMenuItem variant="destructive" onSelect={() => setDisableUserDialogOpen(true)}>
                        <IconUserCheck className="size-4" />
                        Activate User
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem variant="destructive" onSelect={() => setDisableUserDialogOpen(true)}>
                        <IconUserOff className="size-4" />
                        Deactivate User
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>

            <DialogForm
                title={user.banned_until ? 'Activate User' : 'Deactivate User'}
                action={(id, isLoading) =>
                    user.banned_until ? (
                        <Button variant="destructive" type="submit" form={id} disabled={isLoading}>
                            {isLoading ? 'Activating user...' : 'Activate User'}
                        </Button>
                    ) : (
                        <Button variant="destructive" type="submit" form={id} disabled={isLoading}>
                            {isLoading ? 'Deactivating user...' : 'Deactivate User'}
                        </Button>
                    )
                }
                form={(id, setIsLoading) => (
                    <AdminDisableUserForm
                        id={id}
                        activate={!!user.banned_until}
                        setIsLoading={setIsLoading}
                        onSuccess={() => setDisableUserDialogOpen(false)}
                    />
                )}
                id={user.id}
                open={disableUserDialogOpen}
                onOpenChange={setDisableUserDialogOpen}
            />
        </DropdownMenu>
    );
}
