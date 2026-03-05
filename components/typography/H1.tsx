import { cn } from '@/lib/utils';
import type { TypographyType } from '@/lib/types/typography';

export default function H1({ children, className }: TypographyType) {
    return <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight', className)}>{children}</h1>;
}
