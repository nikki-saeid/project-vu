import ProjectCard from './project-card';
import { memo } from 'react';
import { useUser } from '@/lib/contexts/user-context';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '../ui/button';
import NoProjectsUi from './no-projects-ui';

function ProjectsList() {
    const { projects } = useUser();

    return (
        <section>
            {projects.length > 0 ? (
                <div className="grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} />
                    ))}
                </div>
            ) : (
              <NoProjectsUi />
            )}
        </section>
    );
}

export default memo(ProjectsList);
