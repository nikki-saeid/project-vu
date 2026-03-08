'use client';

import { useMap } from '@/lib/contexts/map-context';
import { LocationMarker } from '../map-ui/location-marker';
import { LocationFeature } from '@/lib/types/features';
import { useEffect } from 'react';

type ProjectLocationPickerProps = {
    onSearchedLocationChange: (location: LocationFeature) => void;
};

export default function ProjectLocationPickerInner({ onSearchedLocationChange }: ProjectLocationPickerProps) {
    const { searchedLocation } = useMap();

    useEffect(() => {
        if (searchedLocation) {
            onSearchedLocationChange(searchedLocation);
        }
    }, [searchedLocation, onSearchedLocationChange]);

    return <LocationMarker key={searchedLocation?.properties.name ?? ''} location={searchedLocation ?? undefined} />;
}
