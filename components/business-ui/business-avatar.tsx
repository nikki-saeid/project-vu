import type { ProfileAvatarProps } from '@/lib/types/forms';
import { IconPhoto } from '@tabler/icons-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils/classes-merge';

export default function BusinessAvatar({ logo_url, name, badge, className }: ProfileAvatarProps) {
    return (
        <Avatar className={cn('relative size-24 overflow-visible flex items-center justify-center bg-muted border', className)}>
            {logo_url ? (
                <AvatarImage className="rounded-full text-gray-400 object-cover" src={logo_url} alt={name ?? 'business logo'} />
            ) : (
                <IconPhoto className="size-10 text-gray-300" />
            )}

            {badge && <div className="absolute right-1 z-10 bottom-1">{badge}</div>}
        </Avatar>
    );
}
