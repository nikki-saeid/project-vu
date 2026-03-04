import {
    IconAppWindow,
    IconBuildingCommunity,
    IconCode,
    IconCreditCard,
    IconDashboard,
    IconMap2,
    IconUserCircle,
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

export const USER_ONBOARDING_STEPS = [
    {
        title: 'Personal information',
        description: 'Enter your name, and other personal details. This information will appear on your public profile.',
    },
    {
        title: 'Business details',
        description: 'Provide your business information. These details will be visible on your public profile.',
    },
    {
        title: 'Projects list',
        description: 'Add and configure your initial projects. Your projects will be showcased on your public profile.',
    },
];
