'use client';

import DashboardLayout from '@/components/dashboard-ui/dashboard-layout';
import DashboardSidebarGroup from '@/components/dashboard-ui/dashboard-sidebar-group';
import { USER_DASHBOARD_SIDEBAR_NAVIGATION } from '@/constants/user-dashboard';
import { ChildrenProp } from '@/types/common';

export default function layout({ children }: ChildrenProp) {
    return (
        <DashboardLayout
            sidebarContent={
                <>
                    <DashboardSidebarGroup data={USER_DASHBOARD_SIDEBAR_NAVIGATION.main} />
                    <DashboardSidebarGroup label="Account" data={USER_DASHBOARD_SIDEBAR_NAVIGATION.account} />
                    <DashboardSidebarGroup label="Map" data={USER_DASHBOARD_SIDEBAR_NAVIGATION.map} />
                </>
            }
        >
            {children}
        </DashboardLayout>
    );
}
