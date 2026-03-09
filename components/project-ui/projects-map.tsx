'use client';

import { usePublic } from '@/lib/contexts/public-context';
import { memo } from 'react';
import Map from '../map-ui/map';
import NoProjectsUi from './no-projects-ui';
import ProjectsLocations from './projects-locations';

type ProjectsMapProps = { embed?: boolean };

function ProjectsMap({ embed = false }: ProjectsMapProps) {
    const { projects } = usePublic();

    return (
        <>
            {projects.length > 0 ? (
                <Map isSearchable={false} fullHeight={embed} className={embed ? 'rounded-none' : ''}>
                    <ProjectsLocations />
                </Map>
            ) : (
                <NoProjectsUi isAction={!embed} />
            )}
        </>
    );
}

export default memo(ProjectsMap);
