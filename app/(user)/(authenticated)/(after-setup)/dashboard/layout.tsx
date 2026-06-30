'use client';

import DashboardHeader from '@/components/dashboard-ui/dashboard-header';
import DashboardSidebar from '@/components/dashboard-ui/dashboard-sidebar';
import DashboardSidebarGroup from '@/components/dashboard-ui/dashboard-sidebar-group';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useSubscriptionChannel } from '@/hooks/channels/use-subscription-channel';
import { DATE_FORMATS } from '@/lib/constants/date-formats';
import { MAX_MONTHS_FREE_PLAN } from '@/lib/constants/pricing-plans';
import { USER_DASHBOARD_SIDEBAR_NAVIGATION } from '@/lib/constants/user-dashboard';
import { useDashboard } from '@/lib/contexts/dashboard-context';
import type { ChildrenProp } from '@/lib/types/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { addMonths, format } from 'date-fns';
import Link from 'next/link';

const queryClient = new QueryClient();

export default function MainLayout({ children }: ChildrenProp) {
    const { subscription, business } = useDashboard();
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
                <DashboardSidebar
                    variant="inset"
                    footer={
                        subscription ? undefined : (
                            <div className="border rounded-lg p-2 flex flex-col items-center gap-2">
                                <P className="text-xs font-semibold text-center">
                                    Your plan is currently limited to 3 projects.{' '}
                                    {business
                                        ? 'Until ' + format(addMonths(business.created_at, MAX_MONTHS_FREE_PLAN), DATE_FORMATS.dateNumber)
                                        : ''}
                                </P>
                                <Link href="/payment/subscription-plan" className="w-full">
                                    <Button variant="outlinePrimary" size="sm" className="w-full">
                                        Go Unlimited
                                    </Button>
                                </Link>
                            </div>
                        )
                    }
                >
                    <DashboardSidebarGroup data={USER_DASHBOARD_SIDEBAR_NAVIGATION.main} />
                    <DashboardSidebarGroup label="Map" data={USER_DASHBOARD_SIDEBAR_NAVIGATION.map} />
                    <DashboardSidebarGroup
                        label="Settings"
                        data={
                            subscription
                                ? USER_DASHBOARD_SIDEBAR_NAVIGATION.settings
                                : USER_DASHBOARD_SIDEBAR_NAVIGATION.settings.filter((item) => item.url !== '/dashboard/billing')
                        } // Hide billing if no subscription
                    />
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
