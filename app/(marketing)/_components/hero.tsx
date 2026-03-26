import Link from 'next/link';

import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { DEMO_URL } from '@/lib/constants/urls';
import { IconAppWindow, IconArrowRight } from '@tabler/icons-react';
import Container from '@/components/ui/container';

export default function Hero() {
    return (
        <section className="from-primary/10 to-transparent bg-linear-to-b">
            <Container>
                <div className="flex flex-col mt-20">
                    <H1 className="text-center leading-9 text-3xl sm:text-4xl md:text-5xl">Map it. Share it. Vu it.</H1>

                    <P className="text-balance text-center mt-4 text-lg text-foreground leading-7">
                        Show your projects on a map, in a list, and in one professional profile.
                    </P>

                    <div className="mt-8 flex gap-2 max-w-md mx-auto">
                        <Link href="/signup" className="flex-1">
                            <Button
                                size="lg"
                                className="w-full bg-primary-dark text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground"
                            >
                                Get started now
                                <IconArrowRight className="size-4" />
                            </Button>
                        </Link>
                        <Link href={DEMO_URL} className="flex-1" target="_blank">
                            <Button
                                size="lg"
                                // className="w-full bg-primary-dark/10 border border-primary-dark text-primary-dark hover:bg-primary-dark/10 hover:text-primary-dark"
                                className="w-full"
                                variant="outlinePrimaryDark"
                            >
                                See live example
                                <IconAppWindow className="size-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
