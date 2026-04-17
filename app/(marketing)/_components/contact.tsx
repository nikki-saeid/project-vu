import P from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { IconSend } from '@tabler/icons-react';
import Link from 'next/link';
import SectionHeader from './section-header';

export default function Contact() {
    return (
        <section id={SECTIONS_IDS.contact}>
            <Container>
                <div className="p-10 rounded-lg border shadow-none bg-transparent flex flex-col gap-4 md:gap-6 items-center ">
                    <SectionHeader
                        label="CONTCAT"
                        description="We are here for you, connect with us at any time, Email us at the address below and we will get back to you as soon as possible."
                    />

                    <Badge variant="outline">
                        <P className="">
                            <strong className="font-semibold text-center text-md">support@projectvu.com.au</strong>
                        </P>
                        <Link href="mailto:support@projectvu.com.au">
                            <Button variant="outline" size="icon-xs" className="rounded-full">
                                <IconSend />
                            </Button>
                        </Link>
                    </Badge>
                </div>
            </Container>
        </section>
    );
}
