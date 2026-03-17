import { cn } from '@/lib/utils';
import type { TypographyType } from '@/lib/types/typography';

export default function P({ children, className }: TypographyType) {
    return <p className={cn('text-sm leading-5 tracking-tight', className)}>{children}</p>;
}
