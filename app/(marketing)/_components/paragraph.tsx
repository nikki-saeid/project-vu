import H2 from '@/components/typography/H2';
import P from '@/components/typography/P';

type ParagraphProps = {
    header: string;
    title: string;
    bullets?: string[];
};

export default function Paragraph({ header, title, bullets }: ParagraphProps) {
    return (
        <div className="flex flex-col gap-2">
            <H2 className="text-lg">{header}</H2>
            <P>{title}</P>

            {bullets && (
                <ul className="flex flex-col gap-1">
                    {bullets.map((bullet) => (
                        <li key={bullet} className="list-disc ml-4">
                            <P>{bullet}</P>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
