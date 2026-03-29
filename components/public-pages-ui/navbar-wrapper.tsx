import { cn } from '@/lib/utils/classes-merge';
import type { NavbarWrapperProps } from '@/lib/types/dashboard';
import Container from '../ui/container';
import Logo from '../logo';

export default function NavbarWrapper({ children, className, variant }: NavbarWrapperProps) {
    return (
        <header className={cn('bg-background sticky top-0 z-50 border-b', className)}>
            <Container>
                <div className="flex items-center py-4 md:py-6 justify-between">
                    <Logo variant={variant} />
                    {children}
                </div>
            </Container>
        </header>
    );
}
