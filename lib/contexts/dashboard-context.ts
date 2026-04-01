'use client';

import type { ProjectWithLatLng } from '@/lib/types/api';
import type { Business, Subscription } from '@/lib/types/db';
import { createContext, useContext } from 'react';

export type DashboardContextValue = {
    business: Business | null;
    setBusiness: (business: Business | null) => void;
    projects: ProjectWithLatLng[];
    setProjects: (projects: ProjectWithLatLng[]) => void;
    subscription: Subscription | null;
    setSubscription: (subscription: Subscription | null) => void;
};

export const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}
