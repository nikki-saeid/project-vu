'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useCurrentUserMetadata from '@/hooks/use-current-user-metadata';
import { createClient } from '@/lib/supabase/client';
import { IconCreditCard, IconLogout, IconUserCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardAvatar() {
    // user metadata
    const userMetadata = useCurrentUserMetadata();
    const name = userMetadata?.name ?? null;
    const avatarUrl = userMetadata?.avatar_url ?? null;
    const email = userMetadata?.email ?? null;
    const initials = (name || email || 'U')
        ?.split(' ')
        ?.map((word: string) => word[0])
        ?.join('')
        ?.toUpperCase();

    // logout button
    const router = useRouter();
    const logout = async () => {
        toast.loading('Logging out...');
        const supabase = createClient();

        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.dismiss();
            router.push('/login');
        } catch (error: unknown) {
            toast.dismiss();
            toast.error(error instanceof Error ? error.message : 'An error occurred while logging out.');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={initials} />}
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="grid flex-1 text-left text-sm leading-tight px-2 py-1.5">
                        {name && <span className="truncate font-medium">{name}</span>}
                        <span className="text-muted-foreground truncate text-xs">{email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <IconLogout />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
