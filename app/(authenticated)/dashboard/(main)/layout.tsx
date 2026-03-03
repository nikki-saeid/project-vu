import DashboardHeader from '@/components/dashboard-ui/dashboard-header';
import DashboardSidebar from '@/components/dashboard-ui/dashboard-sidebar';
import DashboardSidebarGroup from '@/components/dashboard-ui/dashboard-sidebar-group';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { USER_DASHBOARD_SIDEBAR_NAVIGATION } from '@/constants/user-dashboard';
import { getUserProfile } from '@/lib/api-fetcher/user-profile';
import type { ChildrenProp } from '@/types/common';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function UserLayout({ children }: ChildrenProp) {
    const profile = await getUserProfile();

    if (!profile || !profile.is_onboarded) {
        redirect('/dashboard/onboarding');
    }

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 55)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <DashboardSidebar variant="inset">
                <DashboardSidebarGroup data={USER_DASHBOARD_SIDEBAR_NAVIGATION.main} />
                <DashboardSidebarGroup label="Map" data={USER_DASHBOARD_SIDEBAR_NAVIGATION.map} />
                <DashboardSidebarGroup label="Account" data={USER_DASHBOARD_SIDEBAR_NAVIGATION.account} />
            </DashboardSidebar>
            <SidebarInset>
                <DashboardHeader
                    pagesMetadata={Object.values(USER_DASHBOARD_SIDEBAR_NAVIGATION)
                        .flat()
                        .map((item) => ({ ...item, Icon: undefined }))}
                />
                <main className="flex flex-1 flex-col gap-6 md:p-6 p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
