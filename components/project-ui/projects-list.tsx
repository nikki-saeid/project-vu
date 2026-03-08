'use client';

import { usePublic } from '@/lib/contexts/public-context';
import { memo } from 'react';
import NoProjectsUi from './no-projects-ui';
import ProjectCard from './project-card';

function ProjectsList() {
    const { projects } = usePublic();

    return (
        <section>
            {projects.length > 0 ? (
                <div className="grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            ) : (
                <NoProjectsUi isAction />
            )}
        </section>
    );
}

export default memo(ProjectsList);
