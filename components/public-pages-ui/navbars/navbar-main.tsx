'use client';

import Logo from '@/components/logo';
import { NavbarMainProps } from '@/lib/types/dashboard';
import NavbarContentDesktop from '../navbar-content-desktop';
import NavbarCore from '../navbar-core';
import NavbatContentMobile from '../navbat-content-mobile';

export default function NavbarMain({ variant, className }: NavbarMainProps) {
    return (
        <NavbarCore className={className}>
            <Logo variant={variant} />
            <NavbarContentDesktop />
            <NavbatContentMobile />
        </NavbarCore>
    );
}
