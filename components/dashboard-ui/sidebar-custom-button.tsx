'use client';

import { cn } from '@/lib/utils/classes-merge';
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
                'active:bg-primary/10 active:text-primary',
                'data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
                'hover:bg-primary/5 hover:text-primary',
                'bg-transparent text-foreground',
            )}
        >
            {children}
            <span>{title}</span>
        </SidebarMenuButton>
    );
}
