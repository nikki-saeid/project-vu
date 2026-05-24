'use client';

import { AdminContext, AdminContextValue } from '@/lib/contexts/admin-context';
import React, { useEffect, useMemo, useState } from 'react';
import type { UsersWithPagination } from '../types/api';
import { Subscription } from '../types/db';
import Stripe from 'stripe';

type AdminProviderProps = {
    children: React.ReactNode;
    initialActiveSubscriptions: Subscription[];
    initialUsersWithPagination: UsersWithPagination | null;
    initialPricings: Stripe.Price[] | null;
};

export function AdminProvider({ children, initialActiveSubscriptions, initialUsersWithPagination, initialPricings }: AdminProviderProps) {
    const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[]>(initialActiveSubscriptions);
    const [usersWithPagination, setUsersWithPagination] = useState<UsersWithPagination | null>(initialUsersWithPagination);
    const [pricings, setPricings] = useState<Stripe.Price[] | null>(initialPricings);

    useEffect(() => {
        setActiveSubscriptions(initialActiveSubscriptions);
    }, [initialActiveSubscriptions]);

    useEffect(() => {
        setUsersWithPagination(initialUsersWithPagination);
    }, [initialUsersWithPagination]);

    useEffect(() => {
        setPricings(pricings);
    }, [pricings]);

    const value = useMemo<AdminContextValue>(
        () => ({
            activeSubscriptions,
            usersWithPagination,
            setActiveSubscriptions,
            setUsersWithPagination,
            pricings,
            setPricings,
        }),
        [activeSubscriptions, usersWithPagination, pricings],
    );

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
