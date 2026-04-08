'use client';

import { projectToLocationFeature } from '@/lib/helpers/project-map';
import { ProjectWithLatLng } from '@/lib/types/api';
import type { LocationFeature } from '@/lib/types/features';
import { memo, useMemo, useState } from 'react';
import { LocationMarker } from '../map-ui/location-marker';
import { LocationPopup } from '../map-ui/location-popup';

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

            {!disablePopup && selectedLocation && (
                <LocationPopup
                    location={selectedLocation}
                    onClose={handlePopUpOff}
                    project={projects.find((p) => p.id === selectedLocation.properties.mapbox_id)}
                    isPublic={isPublic}
                    slug={slug}
                />
            )}
        </>
    );
}

export default memo(ProjectsLocations);
