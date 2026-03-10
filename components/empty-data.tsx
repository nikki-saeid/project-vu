import { ChildrenProp, ClassNameProp } from '@/lib/types/common';
import { cn } from '@/lib/utils';

type EmptyDataProps = ChildrenProp & ClassNameProp;

export default function EmptyData({ children, className }: EmptyDataProps) {
    return (
        <div className={cn('rounded-lg border border-dashed bg-muted/30 p-6 text-center text-muted-foreground', className)}>{children}</div>
    );
}
