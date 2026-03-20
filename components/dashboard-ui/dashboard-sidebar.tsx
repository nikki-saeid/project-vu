import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { DashboardSidebarProps } from '@/lib/types/dashboard';
import DashboardLogo from './dashboard-logo';

export default function DashboardSidebar({ children, ...props }: DashboardSidebarProps) {
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
        </Sidebar>
    );
}
