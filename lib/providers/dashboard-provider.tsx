'use client';

import type { ProjectWithLatLng } from '@/lib/types/api';
import type { Business, Subscription } from '@/lib/types/db';
import React, { useEffect, useMemo, useState } from 'react';
import { DashboardContext, DashboardContextValue } from '../contexts/dashboard-context';

type DashboardProviderProps = {
    children: React.ReactNode;
    initialSubscription: Subscription | null;
    initialBusiness: Business | null;
    initialProjects: ProjectWithLatLng[] | null;
};

export function DashboardProvider({ children, initialBusiness, initialProjects = [], initialSubscription }: DashboardProviderProps) {
    const [subscription, setSubscription] = useState<Subscription | null>(initialSubscription);
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [projects, setProjects] = useState<ProjectWithLatLng[]>(initialProjects ?? []);

    useEffect(() => {
        setSubscription(initialSubscription);
    }, [initialSubscription]);

    useEffect(() => {
        setBusiness(initialBusiness);
    }, [initialBusiness]);

    useEffect(() => {
        setProjects(initialProjects ?? []);
    }, [initialProjects]);

    const value = useMemo<DashboardContextValue>(
        () => ({
            business,
            setBusiness,
            projects,
            setProjects,
            subscription,
            setSubscription,
        }),
        [business, projects, subscription],
    );

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}
