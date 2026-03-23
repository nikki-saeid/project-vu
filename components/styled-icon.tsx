import { cn } from '@/lib/utils';
import type { StyledIconProps } from '@/lib/types/ui';

export default function StyledIcon({ className, IconProps, Icon }: StyledIconProps) {
    return (
        <div className={cn('size-8 aspect-square rounded-full flex items-center justify-center bg-muted', className)}>
            <Icon className={cn('text-primary size-4', IconProps?.className)} />
        </div>
    );
}
