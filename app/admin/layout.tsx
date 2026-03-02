import DashboardHeader from '@/components/dashboard-ui/dashboard-header';
import DashboardSidebar from '@/components/dashboard-ui/dashboard-sidebar';
import DashboardSidebarGroup from '@/components/dashboard-ui/dashboard-sidebar-group';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ADMIN_DASHBOARD_SIDEBAR_NAVIGATION } from '@/constants/admin-dashboard';
import { createClient } from '@/lib/supabase/server';
import { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function UserLayout({ children }: ChildrenProp) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect('/login');
    } else if (data.claims.app_metadata?.role !== 'admin') {
        redirect('/');
    }

    return (
        <SidebarProvider
            style={
                { '--sidebar-width': 'calc(var(--spacing) * 55)', '--header-height': 'calc(var(--spacing) * 12)' } as React.CSSProperties
            }
        >
            <DashboardSidebar variant="inset">
                <DashboardSidebarGroup data={ADMIN_DASHBOARD_SIDEBAR_NAVIGATION.main} />
            </DashboardSidebar>
            <SidebarInset>
                <DashboardHeader
                    pagesMetadata={Object.values(ADMIN_DASHBOARD_SIDEBAR_NAVIGATION)
                        .flat()
                        .map((item) => ({ ...item, Icon: undefined }))}
                />
                <main className="flex flex-1 flex-col gap-6 md:p-6 p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
