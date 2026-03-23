import { cn } from '@/lib/utils/classes-merge';
import type { TypographyType } from '@/lib/types/typography';

export default function H3({ children, className }: TypographyType) {
    return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-wide', className)}>{children}</h3>;
}
