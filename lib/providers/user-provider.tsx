'use client';

import { UserContext, UserContextValue } from '@/lib/contexts/user-context';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useMemo, useState } from 'react';
import { ProjectWithLatLng } from '../types/api';
import { Business } from '../types/db';

type UserProviderProps = {
    children: React.ReactNode;
    initialUser: User | null;
    initialDemoProjects: ProjectWithLatLng[] | null;
    initialDemoBusiness: Business | null;
};

export function UserProvider({ children, initialUser, initialDemoProjects, initialDemoBusiness }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [demoProjects, setDemoProjects] = useState<ProjectWithLatLng[] | null>(initialDemoProjects);
    const [demoBusiness, setDemoBusiness] = useState<Business | null>(initialDemoBusiness);

    useEffect(() => {
        setDemoProjects(demoProjects);
    }, [demoProjects]);

    useEffect(() => {
        setDemoBusiness(demoBusiness);
    }, [demoBusiness]);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const value = useMemo<UserContextValue>(
        () => ({
            user,
            setUser,
            demoProjects,
            setDemoProjects,
            demoBusiness,
            setDemoBusiness,
        }),
        [user, demoProjects, demoBusiness],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
