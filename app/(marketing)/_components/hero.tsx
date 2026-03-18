import Link from 'next/link';

import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { DEMO_URL } from '@/lib/constants/urls';
import { IconAppWindow, IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="grid md:grid-cols-5 items-center grid-cols-1 md:gap-6 gap-4">
            <div className="flex flex-col col-span-2">
                <H1 className="max-w-3xl text-balance  text-4xl sm:text-5xl md:text-6xl">Put your work on the map ... literally.</H1>

                <P className="text-balance max-w-3xl mt-4  text-muted-foreground leading-5">
                    Showcase every job you&apos;ve completed on a beautiful, shareable map. Help customers discover nearby projects, build
                    trust, and win more business in your service area.
                </P>

                <div className="mt-8 flex gap-2">
                    <Link href="/signup" className="flex-1">
                        <Button size="lg" className="w-full">
                            Get started now
                            <IconArrowRight className="size-4" />
                        </Button>
                    </Link>
                    <Link href={DEMO_URL} className="flex-1" target="_blank">
                        <Button size="lg" variant="outline" className="w-full">
                            See live example
                            <IconAppWindow className="size-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="col-span-3">
                <Image src="/home/hero.webp" alt="hero image an illustration of a map and project" width={1000} height={500} />
            </div>
        </section>
    );
}
