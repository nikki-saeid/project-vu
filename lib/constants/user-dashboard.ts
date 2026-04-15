import { Constants } from '@/lib/types/supabase';
import { IconAppWindow, IconBuildings, IconCode, IconCreditCard, IconPencil, IconUserCircle } from '@tabler/icons-react';

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
    settings: [
        {
            title: 'Edit live page',
            url: '/dashboard/live-page?open=true',
            Icon: IconPencil,
        },
        {
            title: 'Account',
            url: '/dashboard/account',
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
    'Architect',
    'Builder',
    'Cabinet Maker',
    'Carpenter',
    'Designer',
    'Developer',
    'Draftsperson',
    'Electrician',
    'Flooring Specialist',
    'Interior Designer',
    'Joiner',
    'Landscaper',
    'Mechanical services',
    'Painter',
    'Photographer',
    'Plumber',
    'Project Manager',
    'Refrigeration & HVAC',
    'Roofer',
    'Shopfitter',
    'Tiler',
    'Videographer',
    'Other',
];

export const PROJECT_TYPE_TAGS = ['Residential', 'Commercial', 'Industrial', 'Fitout', 'Renovation', 'New Build', 'Other'];
export const SERVICE_TYPE_TAGS = ['Design', 'Installation', 'Construction', 'Maintenance', 'Repair', 'Consultation', 'Other'];
