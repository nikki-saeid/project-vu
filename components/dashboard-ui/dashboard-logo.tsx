'use client';
import Logo from '../logo';
import { useSidebar } from '../ui/sidebar';

export default function DashboardLogo() {
    const { state, isMobile } = useSidebar();

    if (isMobile) {
        return <Logo variant="full" />;
    }

    return state === 'collapsed' ? <Logo variant="icon" /> : <Logo variant="full" />;
}
