'use client';

import { useMap } from '@/lib/contexts/map-context';
import type { ProjectLocationPickerProps } from '@/lib/types/forms';
import { useEffect } from 'react';
import { LocationMarker } from '../map-ui/location-marker';

export default function ProjectLocationPickerInner({ onSearchedLocationChange }: ProjectLocationPickerProps) {
    const { searchedLocation } = useMap();

    useEffect(() => {
        if (searchedLocation) {
            onSearchedLocationChange(searchedLocation);
        }
    }, [searchedLocation, onSearchedLocationChange]);

    return <LocationMarker key={searchedLocation?.properties.name ?? ''} location={searchedLocation ?? undefined} />;
}
