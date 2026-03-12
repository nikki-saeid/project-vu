'use client';

import { usePublic } from '@/lib/contexts/public-context';
import { memo, Suspense } from 'react';
import NoProjectsUi from './no-projects-ui';
import ProjectCard from './project-card';
import ProjectsListSkeleton from '../skeleton-ui/projects-list-skeleton';
import ProjectCardAction from './project-card-action';

function ProjectsList() {
    const { projects, isPublic } = usePublic();

    return !projects ? (
        <ProjectsListSkeleton />
    ) : (
        <Suspense fallback={<ProjectsListSkeleton />}>
            <section>
                {projects.length > 0 ? (
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} {...project} action={!isPublic && <ProjectCardAction project={project} />} />
                        ))}
                    </div>
                ) : (
                    <NoProjectsUi isAction={!isPublic} />
                )}
            </section>
        </Suspense>
    );
}

export default memo(ProjectsList);
