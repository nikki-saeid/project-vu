import H2 from '@/components/typography/H2';
import P from '@/components/typography/P';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
    label: string;
    title: string;
    description?: string;
    center?: boolean;
};

export default function SectionHeader({ label, title, description, center = true }: SectionHeaderProps) {
    return (
        <div className={cn('flex flex-col', center && 'items-center')}>
            <P className={cn('mb-3 text-xs font-light tracking-wide text-primary', center && 'text-center')}>{label}</P>
            <H2 className={cn('text-2xl mb-4', center && 'text-center')}>{title}</H2>
            {description && <P className={cn('text-muted-foreground max-w-xl', center && 'text-center')}>{description}</P>}
        </div>
    );
}
