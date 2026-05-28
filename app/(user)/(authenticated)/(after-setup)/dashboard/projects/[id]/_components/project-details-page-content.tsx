'use client';

import DashboardSubNavbar from '@/components/dashboard-ui/dashboard-sub-navbar';
import EmptyData from '@/components/empty-data';
import ProjectDetailsPage from '@/components/project-ui/project-details/project-details-page';
import { useDashboard } from '@/lib/contexts/dashboard-context';

type ProjectDetailsPageContentProps = {
    id: string;
};

export default function ProjectDetailsPageContent({ id }: ProjectDetailsPageContentProps) {
    const { business, projects } = useDashboard();

    const project = projects.find((p) => p.id === id);

    return (
        <div>
            <DashboardSubNavbar />
            <div className="p-4 md:p-6">
                {!business || !project ? (
                    <EmptyData>Project not found</EmptyData>
                ) : (
                    <ProjectDetailsPage project={project} business={business} />
                )}
            </div>
        </div>
    );
}
