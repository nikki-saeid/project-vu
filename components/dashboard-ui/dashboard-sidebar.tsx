'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import type { DashboardSidebarProps } from '@/lib/types/dashboard';
import DashboardLogo from './dashboard-logo';

export default function DashboardSidebar({ children, footer, ...props }: DashboardSidebarProps) {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DashboardLogo />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>{children}</SidebarContent>
            {state !== 'collapsed' && footer && <SidebarFooter>{footer}</SidebarFooter>}
        </Sidebar>
    );
}
