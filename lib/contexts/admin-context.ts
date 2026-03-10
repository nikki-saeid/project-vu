'use client';

import { createContext, useContext } from 'react';
import { AdminUsersResponse } from '../api-fetcher/admin/users';

export type AdminContextValue = {
    activeSubscriptions: number;
    usersWithPagination: AdminUsersResponse;
    setActiveSubscriptions: (activeSubscriptions: number) => void;
    setUsersWithPagination: (usersWithPagination: AdminUsersResponse) => void;
};

export const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within a AdminProvider');
    }
    return context;
}
