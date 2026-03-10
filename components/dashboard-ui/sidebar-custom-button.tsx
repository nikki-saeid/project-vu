'use client';

import { cn } from '@/lib/utils';
import type { SidebarCustomButtonProps } from '@/lib/types/dashboard';
import { SidebarMenuButton } from '../ui/sidebar';
import { usePathname } from 'next/navigation';

export default function SidebarCustomButton({ title, url, children }: SidebarCustomButtonProps) {
    const pathname = usePathname();

    return (
        <SidebarMenuButton
            tooltip={title}
            isActive={pathname === url}
            className={cn(
                'transition duration-100 ease-linear',
                'active:bg-primary active:text-primary-foreground',
                'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
                'hover:bg-primary/90 hover:text-primary-foreground',
                'bg-transparent text-foreground',
            )}
        >
            {children}
            <span>{title}</span>
        </SidebarMenuButton>
    );
}
