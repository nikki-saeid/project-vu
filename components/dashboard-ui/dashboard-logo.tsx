'use client';
import Logo from '../logo';
import { useSidebar } from '../ui/sidebar';

export default function DashboardLogo() {
    const { isMobile, state } = useSidebar();
    return isMobile || state === 'collapsed' ? <Logo className="md:w-5" variant="icon" /> : <Logo className="md:w-26" variant="full" />;
}
