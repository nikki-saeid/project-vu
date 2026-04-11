'use client';

import { Button } from '@/components/ui/button';
import { NAVBAR_URLS } from '@/lib/constants/navbar-url';
import { useUser } from '@/lib/contexts/user-context';
import Link from 'next/link';
import UserAvatar from '../auth-ui/user-avatar';

export default function NavbarContentDesktop() {
    const { user } = useUser();
    return (
        <>
            <div className="items-center gap-2 hidden lg:flex">
                {NAVBAR_URLS.map(({ label, url }) => (
                    <Link key={url} href={url}>
                        <Button size="lg" className="text-foreground" variant="link">
                            {label}
                        </Button>
                    </Link>
                ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
                {user ? (
                    <UserAvatar isAvatar isDashboard />
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="outline">Log in</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button>Sign up</Button>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}
