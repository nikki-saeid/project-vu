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
                <div className="flex md:flex-row items-center flex-col justify-between gap-4 md:gap-6">
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
                <div>
                    <P className="text-white text-xs text-center mb-1">© {new Date().getFullYear()} All rights reserved.</P>
                    <P className="text-center text-white text-xs w-full">
                        By using Project Vu, you agree to our{' '}
                        <Link target="_blank" href="/terms-and-conditions" className="underline underline-offset-2">
                            Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link target="_blank" href="/privacy-policy" className="underline underline-offset-2">
                            Privacy Policy
                        </Link>
                        .
                    </P>
                </div>
            </Container>
        </footer>
    );
}
