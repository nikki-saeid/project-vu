import AdminActivateBanUserForm from '@/components/admin-ui/admin-activate-ban-user-form';
import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { User } from '@supabase/supabase-js';
import { IconDotsVertical, IconUserCancel, IconUserCheck } from '@tabler/icons-react';
import { useState } from 'react';

type ActionMenuProps = {
    user: User;
};

export default function ActionMenu({ user }: ActionMenuProps) {
    const [activateBanUserDialogOpen, setActivateBanUserDialogOpen] = useState(false);

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
                    <DropdownMenuItem variant="destructive" onSelect={() => setActivateBanUserDialogOpen(true)}>
                        {user.banned_until ? (
                            <>
                                <IconUserCheck className="size-4" />
                                Activate User
                            </>
                        ) : (
                            <>
                                <IconUserCancel className="size-4" />
                                ban User
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogForm
                title={user.banned_until ? 'Activate User' : 'Ban User'}
                action={(id, isLoading) =>
                    user.banned_until ? (
                        <Button variant="destructive" type="submit" form={id} disabled={isLoading}>
                            {isLoading ? 'Activating user...' : 'Activate User'}
                        </Button>
                    ) : (
                        <Button variant="destructive" type="submit" form={id} disabled={isLoading}>
                            {isLoading ? 'Banning user...' : 'Ban User'}
                        </Button>
                    )
                }
                form={(id, setIsLoading) => (
                    <AdminActivateBanUserForm
                        id={id}
                        activate={!!user.banned_until}
                        setIsLoading={setIsLoading}
                        onSuccess={() => setActivateBanUserDialogOpen(false)}
                    />
                )}
                id={user.id}
                open={activateBanUserDialogOpen}
                onOpenChange={setActivateBanUserDialogOpen}
            />
        </>
    );
}
