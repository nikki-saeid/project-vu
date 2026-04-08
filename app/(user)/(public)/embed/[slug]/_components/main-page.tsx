'use client';

import ProjectsMap from '@/components/project-ui/projects-map';
import { usePublic } from '@/lib/contexts/public-context';

export default function MainPage() {
    const { projects, business } = usePublic();

    return (
        <div className="min-h-screen w-full">
            <ProjectsMap embed={true} projects={projects} isPublic={true} slug={business?.slug ?? ''} />
        </div>
    );
}
