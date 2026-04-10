'use client';

import SubNavbar from '@/components/sub-navbar';
import EmptyData from '@/components/empty-data';
import ProjectDetailsPage from '@/components/project-ui/project-details/project-details-page';
import { useDashboard } from '@/lib/contexts/dashboard-context';

type ProjectDetailsPageContentProps = {
    id: string;
};

export default function ProjectDetailsPageContent({ id }: ProjectDetailsPageContentProps) {
    const { business, projects } = useDashboard();

    const project = projects.find((p) => p.id === id);

    if (!business || !project) return <EmptyData>Project not found</EmptyData>;

    return (
        <div>
            <SubNavbar />
            <div className="p-4 md:p-6">
                <ProjectDetailsPage project={project} business={business} />
            </div>
        </div>
    );
}
