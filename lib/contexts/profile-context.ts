'use client';

import type { Profile } from '@/lib/types/db';
import { createContext, useContext } from 'react';

export type ProfileContextValue = {
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
};

export const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
