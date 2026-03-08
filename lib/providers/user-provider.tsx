'use client';

import { UserContext, UserContextValue } from '@/lib/contexts/user-context';
import type { Profile } from '@/lib/types/db';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useMemo, useState } from 'react';

type UserProviderProps = {
    children: React.ReactNode;
    initialProfile: Profile | null;
    initialUser: User | null;
};

export function UserProvider({ children, initialProfile, initialUser }: UserProviderProps) {
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const [user, setUser] = useState<User | null>(initialUser);

    useEffect(() => {
        setProfile(initialProfile);
    }, [initialProfile]);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const value = useMemo<UserContextValue>(
        () => ({
            profile,
            setProfile,
            user,
            setUser,
        }),
        [profile, user],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
