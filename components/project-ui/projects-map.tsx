'use client';

import { usePublic } from '@/lib/contexts/public-context';
import { memo } from 'react';
import Map from '../map-ui/map';
import NoProjectsUi from './no-projects-ui';
import ProjectsLocations from './projects-locations';

function ProjectsMap() {
    const { projects } = usePublic();

    console.log("projects",projects);

    return (
        <>
            {projects.length > 0 ? (
                <Map isSearchable={false}>
                    <ProjectsLocations />
                </Map>
            ) : (
                <NoProjectsUi isAction />
            )}
        </>
    );
}

export default memo(ProjectsMap);
