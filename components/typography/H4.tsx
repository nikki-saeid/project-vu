import { cn } from '@/lib/utils';
import type { TypographyType } from '@/types/typography';

export default function H4({ children, className }: TypographyType) {
    return <h1 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h1>;
}
