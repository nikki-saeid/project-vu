import { cn } from '@/lib/utils/classes-merge';
import type { TypographyType } from '@/lib/types/typography';

export default function P({ children, className, style }: TypographyType) {
    return (
        <p className={cn('text-sm leading-5 tracking-tight', className)} style={style}>
            {children}
        </p>
    );
}
