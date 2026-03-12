'use client';

import { useMap } from '@/lib/contexts/map-context';
import type { ProjectLocationPickerProps } from '@/lib/types/forms';
import { useEffect } from 'react';
import { LocationMarker } from '../map-ui/location-marker';

export default function ProjectLocationPickerInner({ onSearchedLocationChange, onEditLocation }: ProjectLocationPickerProps) {
    const { searchedLocation, setSearchedLocation } = useMap();

    useEffect(() => {
        if (searchedLocation) {
            onSearchedLocationChange(searchedLocation);
        }
    }, [searchedLocation, onSearchedLocationChange]);

    useEffect(() => {
        if (onEditLocation) {
            setSearchedLocation(onEditLocation);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onEditLocation]);

    return <LocationMarker key={searchedLocation?.properties.name ?? ''} location={searchedLocation ?? undefined} />;
}
