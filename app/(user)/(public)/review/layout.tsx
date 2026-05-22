import NavbarMain from '@/components/public-pages-ui/navbars/navbar-main';
import { ChildrenProp } from '@/lib/types/common';
import React from 'react';

export default function Layout({ children }: ChildrenProp) {
    return (
        <div className="flex flex-col gap-4 md:gap-6 bg-background min-h-screen">
            <NavbarMain />

            <main className="px-4 md:px-6 pb-4 md:pb-6">
                <div className="flex flex-col gap-4 md:gap-6 max-w-2xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
