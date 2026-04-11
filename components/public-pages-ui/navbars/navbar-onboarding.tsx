'use client';

import UserAvatar from '@/components/auth-ui/user-avatar';
import Logo from '@/components/logo';
import { NavbarOnboardingProps } from '@/lib/types/dashboard';
import NavbarCore from '../navbar-core';

export default function NavbarOnboarding({ variant, className }: NavbarOnboardingProps) {
    return (
        <NavbarCore className={className}>
            <Logo variant={variant} />
            <UserAvatar isAvatar />
        </NavbarCore>
    );
}
