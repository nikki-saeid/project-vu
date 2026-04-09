'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { NAVBAR_URLS } from '@/lib/constants/navbar-url';
import { useUser } from '@/lib/contexts/user-context';
import { NavbarProps } from '@/lib/types/dashboard';
import { IconArrowRight, IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import NavbarWrapper from './navbar-wrapper';
import UserAvatar from '../auth-ui/user-avatar';

function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    return (
        <Drawer open={isOpen} direction="right" onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <IconMenu2 />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerTitle></DrawerTitle>
                <DrawerHeader>
                    <div className="flex flex-col gap-2">
                        {NAVBAR_URLS.map(({ label, url }) => (
                            <Link key={url} href={url} onClick={() => setIsOpen(false)}>
                                <Button size="lg" className="text-foreground" variant="link">
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    {user ? (
                        <UserAvatar isDashboard />
                    ) : (
                        <div className="flex gap-2">
                            <Link href="/login" className="w-full">
                                <Button className="w-full" variant="outline">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/sign-up" className="w-full">
                                <Button className="w-full">Sign up</Button>
                            </Link>
                        </div>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function DesktopNavbar() {
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

export default function Navbar({ variant, className }: NavbarProps) {
    return (
        <NavbarWrapper variant={variant} className={className}>
            <DesktopNavbar />
            <div className="lg:hidden block">
                <MobileNavbar />
            </div>
        </NavbarWrapper>
    );
}
