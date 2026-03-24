'use client';

import { projectToLocationFeature } from '@/lib/helpers/project-map';
import { ProjectWithImages } from '@/lib/types/api';
import type { LocationFeature } from '@/lib/types/features';
import { memo, useMemo, useState } from 'react';
import { LocationMarker } from '../map-ui/location-marker';
import { LocationPopup } from '../map-ui/location-popup';

type ProjectsLocationsProps = {
    projects: ProjectWithImages[];
};

function ProjectsLocations({ projects }: ProjectsLocationsProps) {
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
                    onClick={selectedLocation ? handlePopUpOff : handlePopUpOn}
                />
            ))}

            {selectedLocation && (
                <LocationPopup
                    location={selectedLocation}
                    onClose={handlePopUpOff}
                    project={projects.find((p) => p.id === selectedLocation.properties.mapbox_id)}
                />
            )}
        </>
    );
}

export default memo(ProjectsLocations);
