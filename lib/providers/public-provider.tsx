'use client';

import type { ProjectWithLatLng } from '@/lib/types/api';
import type { Business, Review } from '@/lib/types/db';
import React, { useEffect, useMemo, useState } from 'react';
import { PublicContext, PublicContextValue } from '../contexts/public-context';

type PublicProviderProps = {
    children: React.ReactNode;
    initialBusiness: Business | null;
    initialProjects: ProjectWithLatLng[] | null;
    initialReviews: Review[] | null;
};

export function PublicProvider({ children, initialBusiness, initialProjects = [], initialReviews }: PublicProviderProps) {
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [projects, setProjects] = useState<ProjectWithLatLng[]>(initialProjects ?? []);
    const [reviews, setReviews] = useState<Review[] | null>(initialReviews ?? []);

    useEffect(() => {
        setBusiness(initialBusiness);
    }, [initialBusiness]);

    useEffect(() => {
        setProjects(initialProjects ?? []);
    }, [initialProjects]);

    useEffect(() => {
        setReviews(initialReviews ?? []);
    }, [initialReviews]);

    const value = useMemo<PublicContextValue>(
        () => ({
            business,
            setBusiness,
            projects,
            setProjects,
            reviews,
            setReviews,
        }),
        [business, projects, reviews],
    );

    return <PublicContext.Provider value={value}>{children}</PublicContext.Provider>;
}
