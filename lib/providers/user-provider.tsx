'use client';

import { UserContext, UserContextValue } from '@/lib/contexts/user-context';
import type { Business, Profile, Project } from '@/lib/types/db';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useMemo, useState } from 'react';

type UserProviderProps = {
    children: React.ReactNode;
    initialProfile: Profile | null;
    initialBusiness: Business | null;
    initialUser: User | null;
    initialProjects: Project[] | [];
};

export function UserProvider({ children, initialProfile, initialBusiness, initialUser, initialProjects = [] }: UserProviderProps) {
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const [business, setBusiness] = useState<Business | null>(initialBusiness);
    const [user, setUser] = useState<User | null>(initialUser);
    const [projects, setProjects] = useState<Project[]>(initialProjects);

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
            projects,
            setProjects,
        }),
        [profile, business, user, projects],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
