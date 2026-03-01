import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { DashboardSidebarProps } from '@/types/features';
import DashboardLogo from './dashboard-logo';

export default function DashboardSidebar({ children, ...props }: DashboardSidebarProps) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
                            <DashboardLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>{children}</SidebarContent>
        </Sidebar>
    );
}
