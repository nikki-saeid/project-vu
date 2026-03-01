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
            title: 'Live page',
            url: '/dashboard/live-page',
            Icon: IconAppWindow,
        },
        {
            title: 'Projects',
            url: '/dashboard/projects',
            Icon: IconBuildingCommunity,
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
};
