import React from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { DashboardLayoutProps } from '@/types/features';
import { DashboardSidebar } from './dashboard-sidebar';
import DashboardHeader from './dashboard-header';

export default function DashboardLayout({ children, sidebarContent }: DashboardLayoutProps) {
    return (
        <SidebarProvider
            style={
                { '--sidebar-width': 'calc(var(--spacing) * 55)', '--header-height': 'calc(var(--spacing) * 12)' } as React.CSSProperties
            }
        >
            <DashboardSidebar variant="inset">{sidebarContent}</DashboardSidebar>
            <SidebarInset>
                <DashboardHeader />
                <main className="flex flex-1 flex-col gap-6 md:p-6 p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
