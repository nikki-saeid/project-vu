import { IconCreditCard, IconDashboard, IconTextScan2, IconUsersGroup } from '@tabler/icons-react';

export const ADMIN_DASHBOARD_SIDEBAR_NAVIGATION = {
    main: [
        {
            title: 'Overview',
            url: '/admin/overview',
            Icon: IconDashboard,
        },
        {
            title: 'User management',
            url: '/admin/user-management',
            Icon: IconUsersGroup,
        },
        {
            title: 'Subscriptions',
            url: '/admin/subscriptions',
            Icon: IconCreditCard,
        },
        {
            title: 'Content moderation',
            url: '/admin/content-moderation',
            Icon: IconTextScan2,
        },
    ],
};
