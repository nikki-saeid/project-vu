'use client';

import type { ProjectWithImages } from '@/lib/types/api';
import type { Business } from '@/lib/types/db';
import { createContext, useContext } from 'react';

export type PublicContextValue = {
    business: Business | null;
    setBusiness: (business: Business | null) => void;
    projects: ProjectWithImages[];
    setProjects: (projects: ProjectWithImages[]) => void;
    isPublic: boolean;
};

export const PublicContext = createContext<PublicContextValue | null>(null);

export function usePublic() {
    const context = useContext(PublicContext);
    if (!context) {
        throw new Error('usePublic must be used within a PublicProvider');
    }
    return context;
}
