import { Constants } from '@/lib/types/supabase';
import { IconAppWindow, IconBuildingCommunity, IconCode, IconCreditCard, IconDashboard, IconUserCircle } from '@tabler/icons-react';

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

export const BUSINESS_TYPE = Constants.public.Enums.business_type;
