'use client';

import AddProjectDialog from '@/components/project-ui/add-project-dialog';
import NoProjectsUi from '@/components/project-ui/no-projects-ui';
import ProjectsList from '@/components/project-ui/projects-list';
import { useDashboard } from '@/lib/contexts/dashboard-context';

export default function Projects() {
    const { projects, business } = useDashboard();

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <div className="flex justify-end">
                <AddProjectDialog />
            </div>

            {projects.length > 0 ? (
                <ProjectsList projects={projects} isPublic={false} slug={business?.slug ?? ''} />
            ) : (
                <NoProjectsUi isAction={false} />
            )}
        </div>
    );
}
