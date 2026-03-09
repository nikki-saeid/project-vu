import { cn } from '@/lib/utils';
import type { ContainerProps } from '@/lib/types/ui';

export default function Container({ children, className = '' }: ContainerProps) {
    return <div className={cn('mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}
