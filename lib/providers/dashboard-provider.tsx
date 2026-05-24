'use client';

import type { PriceResponse, ProjectWithLatLng } from '@/lib/types/api';
import type { Business, Review, Subscription } from '@/lib/types/db';
import React, { useEffect, useMemo, useState } from 'react';
import { DashboardContext, DashboardContextValue } from '../contexts/dashboard-context';

type DashboardProviderProps = {
    children: React.ReactNode;
    initialSubscription: Subscription | null;
    initialBusiness: Business | null;
    initialReviews: Review[] | null;
    initialProjects: ProjectWithLatLng[] | null;
    initialPrice: PriceResponse | null;
};

export function DashboardProvider({
    children,
    initialBusiness,
    initialProjects = [],
    initialSubscription,
    initialReviews,
    initialPrice,
}: DashboardProviderProps) {
    const [subscription, setSubscription] = useState<Subscription | null>(initialSubscription);
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [projects, setProjects] = useState<ProjectWithLatLng[]>(initialProjects ?? []);
    const [reviews, setReviews] = useState<Review[] | null>(initialReviews ?? []);
    const [price, setPrice] = useState<PriceResponse | null>(initialPrice ?? null);

    useEffect(() => {
        setSubscription(initialSubscription);
    }, [initialSubscription]);

    useEffect(() => {
        setBusiness(initialBusiness);
    }, [initialBusiness]);

    useEffect(() => {
        setProjects(initialProjects ?? []);
    }, [initialProjects]);

    useEffect(() => {
        setReviews(initialReviews ?? []);
    }, [initialReviews]);

    useEffect(() => {
        setPrice(initialPrice ?? null);
    }, [initialPrice]);

    const value = useMemo<DashboardContextValue>(
        () => ({
            business,
            setBusiness,
            projects,
            setProjects,
            subscription,
            setSubscription,
            reviews,
            setReviews,
            price,
            setPrice,
        }),
        [business, projects, subscription, reviews, price],
    );

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}
