'use client';

import AddProjectDialog from '@/app/(user)/dashboard/(main)/projects/_components/add-project-dialog';
import NoProjectsUi from '@/components/project-ui/no-projects-ui';
import ProjectsList from '@/components/project-ui/projects-list';
import { usePublic } from '@/lib/contexts/public-context';

export default function Projects() {
    const { projects } = usePublic();

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <div className="flex justify-end">
                <AddProjectDialog />
            </div>

            {projects.length > 0 ? <ProjectsList /> : <NoProjectsUi />}
        </div>
    );
}
