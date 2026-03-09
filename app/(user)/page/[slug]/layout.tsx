import Navbar from '@/components/public-pages-ui/navbar';
import Container from '@/components/ui/container';
import { getPublicBusinessBySlug, getPublicProjectsBySlug } from '@/lib/api-fetcher/public-profile';
import { PublicProvider } from '@/lib/providers/public-provider';
import type { ChildrenProp } from '@/lib/types/common';
import { Business } from '@/lib/types/db';
import { ProjectWithImages } from '@/app/api/user/projects/all/route';
import { notFound } from 'next/navigation';

export default async function UserLayout({ children, params }: ChildrenProp & { params: Promise<{ slug: string }> }) {
    let business: Business | null = null;
    let projects: ProjectWithImages[] | null = null;
    const { slug } = await params;

    try {
        business = await getPublicBusinessBySlug(slug);
        projects = await getPublicProjectsBySlug(slug);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return notFound();
        }
        return notFound();
    }

    return (
        <PublicProvider initialBusiness={business} initialProjects={projects}>
            <div className="flex flex-col md:gap-6 gap-4 min-h-screen min-w-screen  overflow-x-hidden bg-background pb-4 md:pb-6">
                <Navbar />
                <Container>{children}</Container>
            </div>
        </PublicProvider>
    );
}
