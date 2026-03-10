'use client';

import { UserContext, UserContextValue } from '@/lib/contexts/user-context';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useMemo, useState } from 'react';

type UserProviderProps = {
    children: React.ReactNode;
    initialUser: User | null;
};

export function UserProvider({ children, initialUser }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const value = useMemo<UserContextValue>(
        () => ({
            user,
            setUser,
        }),
        [user],
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
