'use client';

import { projectToLocationFeature } from '@/lib/helpers/project-map';
import { LocationFeature } from '@/lib/types/features';
import { memo, useMemo, useState } from 'react';
import { LocationMarker } from '../map-ui/location-marker';
import { LocationPopup } from '../map-ui/location-popup';
import { usePublic } from '@/lib/contexts/public-context';
import { ProjectWithImages } from '@/app/api/user/projects/all/route';

function ProjectsLocations() {
    const { projects } = usePublic();
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
                <LocationMarker key={location.properties.mapbox_id} location={location} onClick={handlePopUpOn} />
            ))}

            {selectedLocation && (
                <LocationPopup
                    project={projects.find((p) => p.id === selectedLocation.properties.mapbox_id) as ProjectWithImages}
                    location={selectedLocation}
                    onClose={handlePopUpOff}
                />
            )}
        </>
    );
}

export default memo(ProjectsLocations);
