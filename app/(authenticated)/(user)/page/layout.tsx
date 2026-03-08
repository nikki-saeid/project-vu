import React from 'react';
import type { ChildrenProp } from '@/lib/types/common';
import { PublicProvider } from '@/lib/providers/public-provider';
import { getUserBusiness } from '@/lib/api-fetcher/user-business';
import { getUserProjects } from '@/lib/api-fetcher/user-projects';
import Container from '@/components/ui/container';
import Navbar from '@/components/public-pages-ui/navbar';

export default async function UserLayout({ children }: ChildrenProp) {
    const business = await getUserBusiness();
    const projects = await getUserProjects();

    return (
        <PublicProvider initialBusiness={business} initialProjects={projects}>
            <div className="flex flex-col md:gap-6 gap-4 min-h-screen overflow-x-hidden bg-background pb-4 md:pb-6">
                <Navbar />
                <Container>{children}</Container>
            </div>
        </PublicProvider>
    );
}
