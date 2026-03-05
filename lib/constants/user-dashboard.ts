import { Constants } from '@/lib/types/supabase';
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
        title: 'Business details',
        description: 'Provide your business information. These details will be visible on your public profile.',
    },
    {
        title: 'Projects list',
        description: 'Add and configure your initial projects. Your projects will be showcased on your public profile.',
    },
];

export const BUSINESS_TYPE = Constants.public.Enums.business_type;
