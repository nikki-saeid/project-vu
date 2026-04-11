'use client';

import BackButton from '@/components/back-button';
import { NavbarLivePageProps } from '@/lib/types/dashboard';
import NavbarContentDesktop from '../navbar-content-desktop';
import NavbarCore from '../navbar-core';
import NavbatContentMobile from '../navbat-content-mobile';

export default function NavbarLivePage({ className, url }: NavbarLivePageProps) {
    return (
        <NavbarCore className={className}>
            <BackButton url={url} />
            <NavbarContentDesktop />
            <NavbatContentMobile />
        </NavbarCore>
    );
}
