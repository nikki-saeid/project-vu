'use client';

import type { ProjectWithImages } from '@/lib/types/api';
import type { Business } from '@/lib/types/db';
import React, { useEffect, useMemo, useState } from 'react';
import { DashboardContext, DashboardContextValue } from '../contexts/dashboard-context';

type DashboardProviderProps = {
    children: React.ReactNode;
    initialBusiness: Business | null;
    initialProjects: ProjectWithImages[] | null;
};

export function DashboardProvider({ children, initialBusiness, initialProjects = [] }: DashboardProviderProps) {
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [projects, setProjects] = useState<ProjectWithImages[]>(initialProjects ?? []);

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
        }),
        [business, projects],
    );

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}
