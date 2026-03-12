'use client';

import { usePublic } from '@/lib/contexts/public-context';
import { memo } from 'react';
import Map from '../map-ui/map';
import NoProjectsUi from './no-projects-ui';
import ProjectsLocations from './projects-locations';
import { getCenterLatLng, getZoomLevelForLocations } from '@/lib/helpers/project-map';

type ProjectsMapProps = { embed?: boolean };

function ProjectsMap({ embed = false }: ProjectsMapProps) {
    const { projects, isPublic } = usePublic();
    const centerLatLng = getCenterLatLng(projects);
    const zoomLevel = getZoomLevelForLocations(projects);

    return (
        <>
            {projects.length > 0 ? (
                <Map
                    initialViewState={{ ...centerLatLng, zoom: zoomLevel }}
                    isSearchable={false}
                    fullHeight={embed}
                    className={embed ? 'rounded-none' : ''}
                >
                    <ProjectsLocations />
                </Map>
            ) : (
                <NoProjectsUi isAction={!embed && !isPublic} />
            )}
        </>
    );
}

export default memo(ProjectsMap);
