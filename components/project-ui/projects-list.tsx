'use client';

import { ProjectWithLatLng } from '@/lib/types/api';
import { memo, Suspense } from 'react';
import ProjectsListSkeleton from '../skeleton-ui/projects-list-skeleton';
import NoProjectsUi from './no-projects-ui';
import ProjectCard from './project-card';
import ProjectCardAction from './project-card-action';

type ProjectsListProps = {
    projects: ProjectWithLatLng[];
    isPublic: boolean;
    slug: string;
};

function ProjectsList({ projects, isPublic, slug }: ProjectsListProps) {
    return (
        <section>
            {!projects ? (
                <ProjectsListSkeleton />
            ) : (
                <Suspense fallback={<ProjectsListSkeleton />}>
                    {projects.length > 0 ? (
                        <div className="grid items-stretch xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
                            {projects.map((project) => (
                                <ProjectCard
                                    isPublic={isPublic}
                                    slug={slug}
                                    key={project.id}
                                    {...project}
                                    action={!isPublic && <ProjectCardAction project={project} />}
                                />
                            ))}
                        </div>
                    ) : (
                        <NoProjectsUi isAction={!isPublic} />
                    )}
                </Suspense>
            )}
        </section>
    );
}

export default memo(ProjectsList);
