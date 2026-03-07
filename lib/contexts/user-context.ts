'use client';

import type { Business, Profile, Project } from '@/lib/types/db';
import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

export type UserContextValue = {
    profile: Profile | null;
    business: Business | null;
    setProfile: (profile: Profile | null) => void;
    setBusiness: (business: Business | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
};

export const UserContext = createContext<UserContextValue | null>(null);

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
