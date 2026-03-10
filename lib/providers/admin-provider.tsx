'use client';

import { AdminContext, AdminContextValue } from '@/lib/contexts/admin-context';
import React, { useEffect, useMemo, useState } from 'react';
import { AdminUsersResponse } from '../api-fetcher/admin/users';

type AdminProviderProps = {
    children: React.ReactNode;
    initialActiveSubscriptions: number;
    initialUsersWithPagination: AdminUsersResponse;
};

export function AdminProvider({ children, initialActiveSubscriptions, initialUsersWithPagination }: AdminProviderProps) {
    const [activeSubscriptions, setActiveSubscriptions] = useState<number>(initialActiveSubscriptions);
    const [usersWithPagination, setUsersWithPagination] = useState<AdminUsersResponse>(initialUsersWithPagination);

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
