'use client';

import DashboardHeader from '@/components/dashboard-ui/dashboard-header';
import DashboardSidebar from '@/components/dashboard-ui/dashboard-sidebar';
import DashboardSidebarGroup from '@/components/dashboard-ui/dashboard-sidebar-group';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useSubscriptionChannel } from '@/hooks/channels/use-subscription-channel';
import { USER_DASHBOARD_SIDEBAR_NAVIGATION } from '@/lib/constants/user-dashboard';
import type { ChildrenProp } from '@/lib/types/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function MainLayout({ children }: ChildrenProp) {
    useSubscriptionChannel();

    return (
        <QueryClientProvider client={queryClient}>
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
                    <main className="@container/main flex flex-1 flex-col gap-6">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </QueryClientProvider>
    );
}
