'use client';

import { projectToLocationFeature } from '@/lib/helpers/project-map';
import { ProjectWithLatLng } from '@/lib/types/api';
import type { LocationFeature } from '@/lib/types/features';
import { IconX } from '@tabler/icons-react';
import { memo, useMemo, useState } from 'react';
import { LocationMarker } from '../map-ui/location-marker';
import { Button } from '../ui/button';
import { RelativeDrawer, RelativeDrawerContent, RelativeDrawerTitle } from '../ui/relative-drawer';
import ProjectCard from './project-card';

type ProjectsLocationsProps = {
    projects: ProjectWithLatLng[];
    disablePopup?: boolean;
    isPublic?: boolean;
    slug: string;
};

function ProjectsLocations({ projects, disablePopup, isPublic, slug }: ProjectsLocationsProps) {
    const [selectedLocation, setSelectedLocation] = useState<LocationFeature | null>(null);

    const locationFeatures = useMemo(
        () => projects.map(projectToLocationFeature).filter((f): f is LocationFeature => f != null),
        [projects],
    );

    const handlePopUpOn = (data: LocationFeature | null) => setSelectedLocation(data);
    const handlePopUpOff = () => setSelectedLocation(null);

    return (
        <>
            {locationFeatures.map((location) => (
                <LocationMarker
                    key={location.properties.mapbox_id}
                    location={location}
                    onClick={disablePopup ? undefined : selectedLocation ? handlePopUpOff : handlePopUpOn}
                />
            ))}

            {!disablePopup && (
                // <LocationPopup
                //     location={selectedLocation}
                //     onClose={handlePopUpOff}
                //     project={projects.find((p) => p.id === selectedLocation.properties.mapbox_id)}
                //     isPublic={isPublic}
                //     slug={slug}
                // />

                <RelativeDrawer open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
                    <RelativeDrawerContent
                        action={
                            <Button size="icon-xs" className="rounded-full shadow-xs" variant="outline" onClick={handlePopUpOff}>
                                <IconX />
                            </Button>
                        }
                    >
                        <RelativeDrawerTitle className="hidden"></RelativeDrawerTitle>
                        <ProjectCard
                            {...projects.find((p) => p.id === selectedLocation?.properties.mapbox_id)}
                            isPublic={isPublic}
                            slug={slug}
                            className="max-w-100 mx-auto"
                        />
                    </RelativeDrawerContent>
                </RelativeDrawer>
            )}
        </>
    );
}

export default memo(ProjectsLocations);
