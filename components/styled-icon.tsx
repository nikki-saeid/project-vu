import { cn } from '@/lib/utils';
import type { StyledIconProps } from '@/types/ui';

export default function StyledIcon({ className, IconProps, Icon }: StyledIconProps) {
    return (
        <div className={cn('size-8 rounded-full flex items-center justify-center bg-muted', className)}>
            <Icon className={cn('text-primary size-6', IconProps?.className)} />
        </div>
    );
}
