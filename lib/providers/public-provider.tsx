'use client';

import type { ProjectWithImages } from '@/lib/types/api';
import type { Business } from '@/lib/types/db';
import React, { useEffect, useMemo, useState } from 'react';
import { PublicContext, PublicContextValue } from '../contexts/public-context';

type UserProviderProps = {
    children: React.ReactNode;
    initialBusiness: Business | null;
    initialProjects: ProjectWithImages[] | [];
    isPublic: boolean;
};

export function PublicProvider({ children, initialBusiness, initialProjects = [], isPublic = false }: UserProviderProps) {
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [projects, setProjects] = useState<ProjectWithImages[]>(initialProjects);

    useEffect(() => {
        setBusiness(initialBusiness);
    }, [initialBusiness]);

    useEffect(() => {
        setProjects(initialProjects);
    }, [initialProjects]);

    const value = useMemo<PublicContextValue>(
        () => ({
            business,
            setBusiness,
            projects,
            setProjects,
            isPublic,
        }),
        [business, projects, isPublic],
    );

    return <PublicContext.Provider value={value}>{children}</PublicContext.Provider>;
}
