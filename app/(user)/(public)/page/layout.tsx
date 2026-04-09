'use client';

import Navbar from '@/components/public-pages-ui/navbar';
import type { ChildrenProp } from '@/lib/types/common';

export default function MainLayout({ children }: ChildrenProp) {
    return (
        <div className="flex flex-col bg-background ">
            <Navbar variant="no-icon" className="static" />
            {children}
        </div>
    );
}
