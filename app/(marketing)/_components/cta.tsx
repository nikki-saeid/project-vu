import { Button } from '@/components/ui/button';
import SectionHeader from './section-header';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import Container from '@/components/ui/container';

export default function Cta() {
    return (
        <Container>
            <section className="flex flex-col items-center gap-4 md:gap-6">
                <SectionHeader
                    label="READY WHEN YOU ARE"
                    title="Start mapping your work in under 5 minutes."
                    description="Create your business, drop your first few projects on the map, and share a link with your next lead."
                />

                <Button asChild size="lg" className="">
                    <Link href="/sign-up" className="inline-flex items-center gap-2">
                        Create my map
                        <IconArrowRight className="size-4" />
                    </Link>
                </Button>
            </section>
        </Container>
    );
}
