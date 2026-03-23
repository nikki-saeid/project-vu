'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { NAVBAR_URLS } from '@/lib/constants/navbar-url';
import { IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import NavbarWrapper from './navbar-wrapper';

function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Drawer open={isOpen} direction="right" onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <IconMenu2 />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
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
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function DesktopNavbar() {
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
                <Link href="/login">
                    <Button variant="outline">Log in</Button>
                </Link>
                <Link href="/sign-up">
                    <Button>Sign up</Button>
                </Link>
            </div>
        </>
    );
}

export default function Navbar() {
    return (
        <NavbarWrapper className="border-b">
            <DesktopNavbar />
            <div className="lg:hidden block">
                <MobileNavbar />
            </div>
        </NavbarWrapper>
    );
}
