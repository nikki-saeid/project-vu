import { getCenterLatLng, getZoomLevelForLocations } from '@/lib/helpers/project-map';
import { ProjectWithImages } from '@/lib/types/api';
import { memo } from 'react';
import Map from '../map-ui/map';
import NoProjectsUi from './no-projects-ui';
import ProjectsLocations from './projects-locations';

type ProjectsMapProps = {
    embed: boolean;
    projects: ProjectWithImages[];
    isPublic: boolean;
};

function ProjectsMap({ embed = false, projects, isPublic }: ProjectsMapProps) {
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
                    <ProjectsLocations projects={projects} />
                </Map>
            ) : (
                <NoProjectsUi isAction={!embed && !isPublic} />
            )}
        </>
    );
}

export default memo(ProjectsMap);
