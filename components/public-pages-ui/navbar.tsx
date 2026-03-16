import { Button } from '@/components/ui/button';
import NavbarWrapper from './navbar-wrapper';
import Link from 'next/link';
import { NAVBAR_URLS } from '@/lib/constants/navbar-url';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { IconMenu, IconMenu2 } from '@tabler/icons-react';

function MobileNavbar() {
    return (
        <Drawer direction="right">
            <DrawerTrigger>
                <Button variant="outline" size="icon" className="rounded-full">
                    <IconMenu2 />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <div className="flex flex-col gap-2">
                        {NAVBAR_URLS.map(({ label, url }) => (
                            <Link key={url} href={url}>
                                <Button size="lg" variant="link">
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    <div className="flex flex-col gap-2">
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
            <div className="items-center gap-2 hidden md:flex">
                {NAVBAR_URLS.map(({ label, url }) => (
                    <Link key={url} href={url}>
                        <Button size="lg" variant="link">
                            {label}
                        </Button>
                    </Link>
                ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
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
            <div className="md:hidden block">
                <MobileNavbar />
            </div>
        </NavbarWrapper>
    );
}
