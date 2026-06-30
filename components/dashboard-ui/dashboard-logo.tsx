'use client';
import Logo from '../logo';
import { useSidebar } from '../ui/sidebar';

export default function DashboardLogo() {
    const { state, isMobile } = useSidebar();

    if (isMobile) {
        return <Logo />;
    }

    return state === 'collapsed' ? <Logo variant="icon" size="2xs" /> : <Logo />;
}
