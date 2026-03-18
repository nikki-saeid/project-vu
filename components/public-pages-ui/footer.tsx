import Logo from '@/components/logo';
import P from '@/components/typography/P';
import Container from '@/components/ui/container';
import { NAVBAR_URLS } from '@/lib/constants/navbar-url';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Footer() {
    return (
        <footer className="bg-gray-900 py-4 md:py-6">
            <Container className="flex flex-col gap-4 md:gap-6">
                <div className="flex md:flex-row flex-col justify-between gap-4 md:gap-6">
                    <Logo isWhite />

                    <div className="flex sm:flex-row flex-col items-center gap-2">
                        {NAVBAR_URLS.map(({ label, url }) => (
                            <Link key={url} href={url}>
                                <Button className="text-white" size="lg" variant="link">
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <P className="text-white text-center">© {new Date().getFullYear()} All rights reserved.</P>
            </Container>
        </footer>
    );
}
