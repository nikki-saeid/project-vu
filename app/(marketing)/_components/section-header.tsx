import H2 from '@/components/typography/H2';
import P from '@/components/typography/P';

type SectionHeaderProps = {
    label: string;
    title: string;
    description: string;
};

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
    return (
        <div className="flex flex-col items-center">
            <P className="mb-3 text-xs font-light tracking-wide text-primary text-center">{label}</P>
            <H2 className="text-2xl text-center mb-4">{title}</H2>
            <P className="text-center text-muted-foreground max-w-xl">{description}</P>
        </div>
    );
}
