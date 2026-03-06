'use client';
import NavbarWrapper from '@/components/public-pages-ui/navbar-wrapper';
import { useUser } from '@/lib/contexts/user-context';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default function PreSetupLayout({ children }: ChildrenProp) {
    const { profile } = useUser();

    if (profile && profile.is_onboarded) {
        redirect('/dashboard/overview');
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <NavbarWrapper />
            <main className="px-4 md:px-6 pb-4 md:pb-6">{children}</main>
        </div>
    );
}
