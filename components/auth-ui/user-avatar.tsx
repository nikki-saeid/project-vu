'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/lib/contexts/user-context';
import { createClient } from '@/lib/supabase/client';
import { IconDashboard, IconDotsVertical, IconLogout, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '../ui/button';

type DashboardAvatarProps = {
    isAvatar?: boolean;
    isDashboard?: boolean;
};

function Content({
    name,
    email,
    logout,
    isDashboard,
}: {
    name: string | null;
    email: string | null;
    logout: () => void;
    isDashboard?: boolean;
}) {
    const router = useRouter();

    const handleRedirect = async () => {
        router.push('/dashboard/live-page');
    };

    return (
        <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
        >
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="grid flex-1 text-left text-sm leading-tight px-2 py-1.5">
                    {name && <span className="truncate font-medium capitalize">{name}</span>}
                    {email && <span className="text-muted-foreground truncate text-xs">{email}</span>}
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isDashboard && (
                <>
                    <DropdownMenuItem onClick={handleRedirect} className="text-sm">
                        <IconDashboard className="size-4.5" />
                        My profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </>
            )}
            <DropdownMenuItem onClick={logout} className="text-sm">
                <IconLogout className="size-4.5" />
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

export default function UserAvatar({ isAvatar, isDashboard }: DashboardAvatarProps) {
    // user metadata
    const { user, setUser } = useUser();
    // const { setOpen } = useSidebar();

    const name = user?.user_metadata?.full_name ?? null;
    const email = user?.email ?? null;

    // logout button
    const router = useRouter();
    const logout = async () => {
        toast.loading('Logging out...');
        const supabase = createClient();
        // setOpen(false);

        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
            toast.dismiss();
            router.push('/login');
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while logging out.');
        }
    };

    return isAvatar ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon-sm" variant="outline" className="rounded-full">
                    <IconUser />
                </Button>
            </DropdownMenuTrigger>
            <Content name={name} email={email} logout={logout} isDashboard={isDashboard} />
        </DropdownMenu>
    ) : (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="lg" className="justify-start w-full" variant="outline">
                    <IconUser />
                    {name && <span className="truncate font-medium capitalize">{name}</span>}
                    <div className="ml-auto">
                        <IconDotsVertical />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <Content name={name} email={email} logout={logout} isDashboard={isDashboard} />
        </DropdownMenu>
    );
}
