import { cn } from '@/lib/utils';
import type { LucideIconProps } from '@/types/ui';

export default function LucideIcon({ Icon, color = 'primary', size = 'sm' }: LucideIconProps) {
    return (
        <div
            className={cn(
                size === 'sm' ? 'size-6' : 'size-8',
                'rounded-full  flex items-center justify-center bg-muted',
                color === 'primary' ? 'bg-primary/5' : color === 'success' ? 'bg-success/5' : 'bg-secondary/5',
            )}
        >
            <Icon
                className={cn(
                    size === 'sm' ? 'size-3' : 'size-4',
                    color === 'primary' ? 'text-primary' : color === 'success' ? 'text-success' : 'text-secondary',
                )}
            />
        </div>
    );
}
