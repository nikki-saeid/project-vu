'use client';

import { UserContext, UserContextValue } from '@/lib/contexts/user-context';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useMemo, useState } from 'react';
import { ProjectWithLatLng, PriceResponse } from '../types/api';
import { Business } from '../types/db';

type UserProviderProps = {
    children: React.ReactNode;
    initialUser: User | null;
    initialDemoProjects: ProjectWithLatLng[] | null;
    initialDemoBusiness: Business | null;
    initPricings: PriceResponse[] | null;
};

export function UserProvider({ children, initialUser, initialDemoProjects, initialDemoBusiness, initPricings }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [demoProjects, setDemoProjects] = useState<ProjectWithLatLng[] | null>(initialDemoProjects);
    const [demoBusiness, setDemoBusiness] = useState<Business | null>(initialDemoBusiness);
    const [pricings, setPricings] = useState<PriceResponse[] | null>(initPricings);

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
            pricings,
            setPricings,
        }),
        [user, demoProjects, demoBusiness, pricings],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
