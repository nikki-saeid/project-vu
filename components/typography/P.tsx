import { cn } from '@/lib/utils';
import type { TypographyType } from '@/types/typography';

export default function P({ children, className }: TypographyType) {
    return <h1 className={cn('leading-7 tracking-tight', className)}>{children}</h1>;
}
