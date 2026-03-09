'use client';

import { usePublic } from '@/lib/contexts/public-context';
import { memo, Suspense } from 'react';
import NoProjectsUi from './no-projects-ui';
import ProjectCard from './project-card';
import ProjectsListSkeleton from '../skeleton-ui/projects-list-skeleton';

function ProjectsList() {
    const { projects } = usePublic();

    return !projects ? (
        <ProjectsListSkeleton />
    ) : (
        <Suspense fallback={<ProjectsListSkeleton />}>
            <section>
                {projects.length > 0 ? (
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </div>
                ) : (
                    <NoProjectsUi isAction />
                )}
            </section>
        </Suspense>
    );
}

export default memo(ProjectsList);
