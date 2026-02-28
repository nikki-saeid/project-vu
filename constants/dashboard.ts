import { ArrowUpDown, BicepsFlexed, Calendar, Dumbbell, Home } from 'lucide-react';

export const DASHBOARD_PAGES_METADATA = [
    {
        title: 'Overview',
        pageTitle: 'Overview',
        url: 'overview',
        Icon: Home,
    },
    {
        title: 'Calendar',
        pageTitle: 'Calendar',
        url: 'calendar',
        Icon: Calendar,
    },
    {
        title: 'Athletes',
        pageTitle: 'Athletes',
        url: 'athletes',
        Icon: BicepsFlexed,
    },
    {
        title: 'Athletes',
        pageTitle: 'Athletes',
        url: 'exercises',
        Icon: Dumbbell,
    },
    {
        title: 'Muscle imbalance',
        pageTitle: 'Muscle imbalance',
        url: 'muscle-imbalance',
        Icon: ArrowUpDown,
    },
];
