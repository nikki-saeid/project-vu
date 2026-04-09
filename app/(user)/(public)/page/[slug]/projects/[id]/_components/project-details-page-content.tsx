'use client';

import EmptyData from '@/components/empty-data';
import ProjectDetailsPage from '@/components/project-ui/project-details/project-details-page';
import Container from '@/components/ui/container';
import { usePublic } from '@/lib/contexts/public-context';

type ProjectDetailsPageContentProps = {
    id: string;
};

export default function ProjectDetailsPageContent({ id }: ProjectDetailsPageContentProps) {
    const { business, projects } = usePublic();

    const project = projects.find((p) => p.id === id);

    if (!business || !project) return <EmptyData>Project not found</EmptyData>;

    return (
        <div className="py-4 md:py-6">
            <Container>
                <ProjectDetailsPage project={project} business={business} />
            </Container>
        </div>
    );
}
