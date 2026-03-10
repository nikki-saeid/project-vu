'use client';

import type { User } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export type UserContextValue = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextValue | null>(null);

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
