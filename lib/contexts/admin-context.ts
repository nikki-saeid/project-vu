'use client';

import { createContext, useContext } from 'react';
import { UsersWithPagination } from '../types/api';
import { Subscription } from '../types/db';

export type AdminContextValue = {
    activeSubscriptions: Subscription[];
    usersWithPagination: UsersWithPagination | null;
    setActiveSubscriptions: (activeSubscriptions: Subscription[]) => void;
    setUsersWithPagination: (usersWithPagination: UsersWithPagination | null) => void;
};

export const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within a AdminProvider');
    }
    return context;
}
