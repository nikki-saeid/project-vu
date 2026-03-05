import { cn } from '@/lib/utils';
import type { TypographyType } from '@/lib/types/typography';

export default function H2({ children, className }: TypographyType) {
    return <h1 className={cn('scroll-m-20 text-3xl text-foreground font-semibold tracking-tight', className)}>{children}</h1>;
}
