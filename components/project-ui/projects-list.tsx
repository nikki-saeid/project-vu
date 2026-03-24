'use client';

import { ProjectWithImages } from '@/lib/types/api';
import { memo, Suspense } from 'react';
import ProjectsListSkeleton from '../skeleton-ui/projects-list-skeleton';
import NoProjectsUi from './no-projects-ui';
import ProjectCard from './project-card';
import ProjectCardAction from './project-card-action';

type ProjectsListProps = {
    projects: ProjectWithImages[];
    isPublic: boolean;
};

function ProjectsList({ projects, isPublic }: ProjectsListProps) {
    return (
        <section>
            {/* <div className="flex items-center gap-1 flex-1 justify-between mb-3">
                <P>Total Users : {total}</P>
                <div className="flex items-center gap-1">
                    <Link href={page === 1 ? '' : `?page=${page - 1}`}>
                        <Button disabled={page === 1} variant="outline" size="icon-sm">
                            <IconChevronLeft />
                        </Button>
                    </Link>
                    <Link href={page === lastPage ? '' : `?page=${page + 1}`}>
                        <Button disabled={page === lastPage} variant="outline" size="icon-sm">
                            <IconChevronRight />
                        </Button>
                    </Link>
                </div>
            </div> */}

            {!projects ? (
                <ProjectsListSkeleton />
            ) : (
                <Suspense fallback={<ProjectsListSkeleton />}>
                    {projects.length > 0 ? (
                        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} {...project} action={!isPublic && <ProjectCardAction project={project} />} />
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
