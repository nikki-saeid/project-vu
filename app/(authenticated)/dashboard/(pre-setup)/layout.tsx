import NavbarWrapper from '@/components/public-pages-ui/navbar-wrapper';
import { getUserProfile } from '@/lib/api-fetcher/user-profile';
import type { ChildrenProp } from '@/lib/types/common';
import { redirect } from 'next/navigation';

export default async function layout({ children }: ChildrenProp) {
    const profile = await getUserProfile();

    if (profile && profile.is_onboarded) {
        redirect('/dashboard/overview');
    }
    return (
        <div className="flex flex-col gap-4 pb-4 md:pb-6 md:gap-6">
            <NavbarWrapper />
            {children}
        </div>
    );
}
