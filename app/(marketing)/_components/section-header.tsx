import H2 from '@/components/typography/H2';
import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
    label: string;
    title: string;
    description?: string;
    center?: boolean;
    isWhite?: boolean;
    secondary?: boolean;
};

export default function SectionHeader({ label, title, description, center = true, isWhite = false }: SectionHeaderProps) {
    return (
        <div className={cn('flex flex-col', center && 'items-center')}>
            <Badge className={cn('mb-3 font-medium text-xs', isWhite ? 'bg-white/30 text-white' : 'bg-primary/10 text-primary')}>
                {label}
            </Badge>
            <H2 className={cn('text-2xl mb-4', center && 'text-center', isWhite ? 'text-white' : 'text-foreground')}>{title}</H2>
            {description && (
                <P className={cn('max-w-xl', center && 'text-center', isWhite ? 'text-muted' : 'text-muted-foreground')}>{description}</P>
            )}
        </div>
    );
}
