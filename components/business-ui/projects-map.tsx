import Map from '../map-ui/map';
import NoProjectsUi from './no-projects-ui';
import ProjectsLocations from './projects-locations';
import { memo } from 'react';
import { useUser } from '@/lib/contexts/user-context';

function ProjectsMap() {
    const { projects } = useUser();

    return (
        <>
            {projects.length > 0 ? (
                <Map>
                    <ProjectsLocations />
                </Map>
            ) : (
                <NoProjectsUi />
            )}
        </>
    );
}

export default memo(ProjectsMap);
