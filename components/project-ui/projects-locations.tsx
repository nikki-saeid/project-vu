'use client';

import { projectToLocationFeature } from '@/lib/helpers/project-map';
import { ProjectWithLatLng } from '@/lib/types/api';
import type { LocationFeature } from '@/lib/types/features';
import { IconX } from '@tabler/icons-react';
import { memo, useMemo, useState } from 'react';
import { LocationMarker } from '../map-ui/location-marker';
import { Button } from '../ui/button';
import ProjectCard from './project-card';
import { cn } from '@/lib/utils/classes-merge';

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
                // <LocationPopup
                //     location={selectedLocation}
                //     onClose={handlePopUpOff}
                //     project={projects.find((p) => p.id === selectedLocation.properties.mapbox_id)}
                //     isPublic={isPublic}
                //     slug={slug}
                // />

                <div className={cn('absolute z-50', 'left-1/2 -translate-x-1/2', 'bottom-2', 'w-80', 'animate-in slide-in-from-bottom')}>
                    <ProjectCard
                        {...projects.find((p) => p.id === selectedLocation.properties.mapbox_id)}
                        isPublic={isPublic}
                        slug={slug}
                        inMap
                        action={
                            <Button size="icon-xs" className="rounded-full shadow-xs" variant="outline" onClick={handlePopUpOff}>
                                <IconX />
                            </Button>
                        }
                    />
                </div>
            )}
        </>
    );
}

export default memo(ProjectsLocations);
