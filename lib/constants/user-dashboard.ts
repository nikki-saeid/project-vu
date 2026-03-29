import { Constants } from '@/lib/types/supabase';
import { IconAppWindow, IconBuildings, IconCode, IconCreditCard, IconUserCircle } from '@tabler/icons-react';

export const USER_DASHBOARD_SIDEBAR_NAVIGATION = {
    main: [
        {
            title: 'Live page',
            url: '/dashboard/live-page',
            Icon: IconAppWindow,
        },
        {
            title: 'Projects',
            url: '/dashboard/projects',
            Icon: IconBuildings,
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

export const BUSINESS_TYPE = [
    'Builder',
    'Architect',
    'Interior Designer',
    'Designer',
    'Developer',
    'Project Manager',
    'Draftsperson',
    'Electrician',
    'Plumber',
    'Carpenter',
    'Joiner',
    'Cabinet Maker',
    'Roofer',
    'Painter',
    'Tiler',
    'Landscaper',
    'Flooring Specialist',
    'Shopfitter',
    'Refrigeration & HVAC',
    'Mechanical services',
    'Photographer',
    'Videographer',
];
