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

export const PROJECT_TYPE_TAGS = ['Residential', 'Commercial', 'Industrial', 'Fitout', 'Renovation', 'New Build'];
export const SERVICE_TYPE_TAGS = ['Design', 'Installation', 'Construction', 'Maintenance', 'Repair', 'Consultation'];
