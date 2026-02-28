import {
    IconAppWindow,
    IconBuildingCommunity,
    IconCode,
    IconCreditCard,
    IconDashboard,
    IconMap2,
    IconUserCircle
} from '@tabler/icons-react';

export const USER_DASHBOARD_SIDEBAR_NAVIGATION = {
    main: [
        {
            title: 'Overview',
            url: '/dashboard/overview',
            Icon: IconDashboard,
        },
        {
            title: 'Pages',
            url: '/dashboard/pages',
            Icon: IconAppWindow,
        },
        {
            title: 'Projects',
            url: '/dashboard/projects',
            Icon: IconBuildingCommunity,
        },
    ],
    account: [
        {
            title: 'Profile',
            url: '/dashboard/profile',
            Icon: IconUserCircle,
        },
        {
            title: 'Billing',
            url: '/dashboard/billing',
            Icon: IconCreditCard,
        },
    ],
    map: [
        {
            title: 'Projects map',
            url: '/dashboard/projects-map',
            Icon: IconMap2,
        },
        {
            title: 'Embedded map',
            url: '/dashboard/embedded-map',
            Icon: IconCode,
        },
    ],
};
