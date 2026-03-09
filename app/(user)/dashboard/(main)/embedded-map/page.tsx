import P from '@/components/typography/P';
import EmbedCodeSection from './_components/embed-code-section';

export default function EmbeddedMapPage() {
    return (
        <div className="flex flex-col gap-6">
            <P className=" text-muted-foreground">Copy the link or embed code below to show your projects map on your own website.</P>
            <div className="rounded-lg border bg-card p-4 md:p-6">
                <EmbedCodeSection />
            </div>
        </div>
    );
}
