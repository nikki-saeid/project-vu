'use client';

import ProjectsMap from '@/components/project-ui/projects-map';
import Container from '@/components/ui/container';
import { SECTIONS_IDS } from '@/lib/constants/navbar-url';
import { useUser } from '@/lib/contexts/user-context';
import SectionHeader from './section-header';

export default function LiveMap() {
    const { demoBusiness, demoProjects } = useUser();

    if (!demoBusiness || !demoProjects) {
        return null;
    }

    return (
        <Container>
            <section id={SECTIONS_IDS.liveMap}>
                <SectionHeader label="LIVE DEMO MAP" title="Showcase your projects with interactive map" />
                <div className="mt-3 rounded-lg overflow-hidden">
                    <ProjectsMap embed={false} projects={demoProjects} isPublic={true} slug={demoBusiness.slug ?? ''} />
                </div>
            </section>
        </Container>
    );
}
