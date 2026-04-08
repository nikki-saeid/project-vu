import { getCenterLatLng, getZoomLevelForLocations } from '@/lib/helpers/project-map';
import { ProjectWithLatLng } from '@/lib/types/api';
import { memo } from 'react';
import Map from '../map-ui/map';
import NoProjectsUi from './no-projects-ui';
import ProjectsLocations from './projects-locations';
import { ClassNameProp } from '@/lib/types/common';
import { cn } from '@/lib/utils/classes-merge';

type ProjectsMapProps = {
    embed: boolean;
    projects: ProjectWithLatLng[];
    isPublic: boolean;
    disablePopup?: boolean;
    slug: string;
} & ClassNameProp;

function ProjectsMap({ embed = false, projects, isPublic, className, disablePopup, slug }: ProjectsMapProps) {
    const centerLatLng = getCenterLatLng(projects);
    const zoomLevel = getZoomLevelForLocations(projects);

    return (
        <>
            {projects.length > 0 ? (
                <Map
                    initialViewState={{ ...centerLatLng, zoom: zoomLevel }}
                    isSearchable={false}
                    fullHeight={embed}
                    className={cn(embed ? 'rounded-none' : '', className)}
                >
                    <ProjectsLocations slug={slug} isPublic={isPublic} projects={projects} disablePopup={disablePopup} />
                </Map>
            ) : (
                <NoProjectsUi isAction={!embed && !isPublic} />
            )}
        </>
    );
}

export default memo(ProjectsMap);
