'use client';

import type { Profile } from '@/lib/types/db';
import React, { useEffect, useMemo, useState } from 'react';
import { ProfileContext, ProfileContextValue } from '../contexts/profile-context';

type ProfileProviderProps = {
    children: React.ReactNode;
    initialProfile: Profile | null;
};

export function ProfileProvider({ children, initialProfile, }: ProfileProviderProps) {
    const [profile, setProfile] = useState<Profile | null>(initialProfile);

    useEffect(() => {
        setProfile(initialProfile);
    }, [initialProfile]);

    const value = useMemo<ProfileContextValue>(
        () => ({
            profile,    
            setProfile,
        }),
        [profile],
    );

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
