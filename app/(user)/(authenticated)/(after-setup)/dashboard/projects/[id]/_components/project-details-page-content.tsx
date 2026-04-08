'use client';

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

    return <ProjectDetailsPage project={project} isPublic={false} business={business} />;
}
