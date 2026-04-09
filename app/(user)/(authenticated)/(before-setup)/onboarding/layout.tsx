import UserAvatar from '@/components/auth-ui/user-avatar';
import NavbarWrapper from '@/components/public-pages-ui/navbar-wrapper';
import type { ChildrenProp } from '@/lib/types/common';

export default function OnboardingLayout({ children }: ChildrenProp) {
    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <NavbarWrapper>
                <UserAvatar isAvatar />
            </NavbarWrapper>
            <main className="px-4 md:px-6 pb-4 md:pb-6">
                <div className="flex flex-col gap-4 md:gap-6 max-w-2xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
