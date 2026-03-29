'use client';

import type { ProjectWithLatLng } from '@/lib/types/api';
import type { Business } from '@/lib/types/db';
import React, { useEffect, useMemo, useState } from 'react';
import { PublicContext, PublicContextValue } from '../contexts/public-context';

type PublicProviderProps = {
    children: React.ReactNode;
    initialBusiness: Business | null;
    initialProjects: ProjectWithLatLng[] | null;
};

export function PublicProvider({ children, initialBusiness, initialProjects = [] }: PublicProviderProps) {
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [projects, setProjects] = useState<ProjectWithLatLng[]>(initialProjects ?? []);

    useEffect(() => {
        setBusiness(initialBusiness);
    }, [initialBusiness]);

    useEffect(() => {
        setProjects(initialProjects ?? []);
    }, [initialProjects]);

    const value = useMemo<PublicContextValue>(
        () => ({
            business,
            setBusiness,
            projects,
            setProjects,
        }),
        [business, projects],
    );

    return <PublicContext.Provider value={value}>{children}</PublicContext.Provider>;
}
