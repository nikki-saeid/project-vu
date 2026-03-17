import Link from 'next/link';

import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { IconAppWindow, IconArrowRight } from '@tabler/icons-react';
import { BASE_URL } from '@/lib/constants/urls';

const DEMO_URL = BASE_URL + '/page/demo-contructor';

export default function Hero() {
    return (
        <section className="grid md:grid-cols-5 items-center grid-cols-1 md:gap-6 gap-4">
            <div className="flex flex-col items-center col-span-5 text-center">
                <H1 className="text-balance  max-w-5xl text-4xl sm:text-5xl md:text-6xl">Put your work on the map ... literally.</H1>

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
                    <Link href={DEMO_URL} className="flex-1">
                        <Button size="lg" variant="outline" className="w-full">
                            See live example
                            <IconAppWindow className="size-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* <div className="col-span-3"></div> */}
        </section>
    );
}
