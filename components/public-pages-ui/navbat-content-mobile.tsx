'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { NAVBAR_URLS } from '@/lib/constants/navbar-url';
import { useUser } from '@/lib/contexts/user-context';
import { IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import UserAvatar from '../auth-ui/user-avatar';

export default function NavbatContentMobile() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    return (
        <div className="lg:hidden block">
            <Drawer open={isOpen} direction="right" onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" size="icon-sm" className="rounded-full">
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
        </div>
    );
}
