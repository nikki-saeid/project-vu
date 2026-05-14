'use client';

import NavbarPayment from '@/components/public-pages-ui/navbars/navbar-payment';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import type { ChildrenProp } from '@/lib/types/common';
import { useRouter } from 'next/navigation';

export default function OnboardingLayout({ children }: ChildrenProp) {
    // const { subscription } = useDashboard();
    // const router = useRouter();

    // if (subscription) {
    //     router.push('/dashboard/live-page');
    // }

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <NavbarPayment />
            <main className="px-4 md:px-6 pb-4 md:pb-6">
                <div className="flex flex-col gap-4 md:gap-6 max-w-2xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
