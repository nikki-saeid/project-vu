'use client';

import type { ProjectWithLatLng } from '@/lib/types/api';
import type { Business, Review } from '@/lib/types/db';
import { createContext, useContext } from 'react';

export type PublicContextValue = {
    business: Business | null;
    setBusiness: (business: Business | null) => void;
    projects: ProjectWithLatLng[];
    setProjects: (projects: ProjectWithLatLng[]) => void;
    reviews: Review[] | null;
    setReviews: (reviews: Review[] | null) => void;
};

export const PublicContext = createContext<PublicContextValue | null>(null);

export function usePublic() {
    const context = useContext(PublicContext);
    if (!context) {
        throw new Error('usePublic must be used within a PublicProvider');
    }
    return context;
}
