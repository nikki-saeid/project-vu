'use client';

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import type { DashboardSidebarGroupProps } from '@/lib/types/dashboard';
import Link from 'next/link';
import SidebarCustomButton from './sidebar-custom-button';

export default function DashboardSidebarGroup({ data, label }: DashboardSidebarGroupProps) {
    const { state, setOpenMobile } = useSidebar();

    return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.map((item) => (
                        <SidebarMenuItem key={item.title} onClick={state === 'expanded' ? () => setOpenMobile(false) : undefined}>
                            <Link href={item.url} className="w-full">
                                <SidebarCustomButton title={item.title} url={item.url}>
                                    <item.Icon />
                                </SidebarCustomButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
