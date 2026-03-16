'use client';
import Logo from '../logo';
import { useSidebar } from '../ui/sidebar';

export default function DashboardLogo() {
    const { state, isMobile } = useSidebar();

    if (isMobile) {
        return <Logo className="md:w-26" variant="full" />;
    }

    return state === 'collapsed' ? <Logo className="md:w-5" variant="icon" /> : <Logo className="md:w-26" variant="full" />;
}
