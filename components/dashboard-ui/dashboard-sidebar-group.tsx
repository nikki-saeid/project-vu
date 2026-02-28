'use client';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { DashboardSidebarGroupProps } from '@/types/features';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebarGroup({ data, label }: DashboardSidebarGroupProps) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <Link href={item.url} className="w-full">
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    isActive={pathname === item.url}
                                    className={cn(
                                        'transition duration-100 ease-linear',
                                        'active:bg-primary active:text-primary-foreground',
                                        'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
                                        'hover:bg-primary/90 hover:text-primary-foreground',
                                        'bg-transparent text-foreground',
                                    )}
                                >
                                    <item.Icon />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
