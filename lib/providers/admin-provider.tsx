'use client';

import { AdminContext, AdminContextValue } from '@/lib/contexts/admin-context';
import React, { useEffect, useMemo, useState } from 'react';
import type { UsersWithPagination } from '../types/api';
import { Subscription } from '../types/db';

type AdminProviderProps = {
    children: React.ReactNode;
    initialActiveSubscriptions: Subscription[];
    initialUsersWithPagination: UsersWithPagination | null;
};

export function AdminProvider({ children, initialActiveSubscriptions, initialUsersWithPagination }: AdminProviderProps) {
    const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[]>(initialActiveSubscriptions);
    const [usersWithPagination, setUsersWithPagination] = useState<UsersWithPagination | null>(initialUsersWithPagination);

    useEffect(() => {
        setActiveSubscriptions(initialActiveSubscriptions);
    }, [initialActiveSubscriptions]);

    useEffect(() => {
        setUsersWithPagination(initialUsersWithPagination);
    }, [initialUsersWithPagination]);

    const value = useMemo<AdminContextValue>(
        () => ({
            activeSubscriptions,
            usersWithPagination,
            setActiveSubscriptions,
            setUsersWithPagination,
        }),
        [activeSubscriptions, usersWithPagination],
    );

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
