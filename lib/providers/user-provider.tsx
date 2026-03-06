'use client';

import { UserContext, UserContextValue } from '@/lib/contexts/user-context';
import type { Business, Profile } from '@/lib/types/db';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useMemo, useState } from 'react';

type UserProviderProps = {
    children: React.ReactNode;
    initialProfile: Profile | null;
    initialBusiness: Business | null;
    initialUser: User | null;
};

export function UserProvider({ children, initialProfile, initialBusiness, initialUser }: UserProviderProps) {
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [user, setUser] = useState<User | null>(initialUser);

    useEffect(() => {
        setProfile(initialProfile);
    }, [initialProfile]);

    useEffect(() => {
        setBusiness(initialBusiness);
    }, [initialBusiness]);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const value = useMemo<UserContextValue>(
        () => ({
            profile,
            business,
            setProfile,
            setBusiness,
            user,
            setUser,
        }),
        [profile, business, user],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
