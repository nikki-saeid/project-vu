'use client';

import { LocationFeature } from '@/lib/types/features';
import { useState } from 'react';
import { LocationMarker } from '../map-ui/location-marker';
import { LocationPopup } from '../map-ui/location-popup';

const locations: LocationFeature[] = [
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-122.4194, 37.7749],
        },
        properties: {
            name: 'San Francisco',
            mapbox_id: '1',
            feature_type: 'place',
            context: {
                country: {
                    name: 'United States',
                    country_code: 'US',
                    country_code_alpha_3: 'USA',
                },
                region: {
                    name: 'California',
                    region_code: 'CA',
                    region_code_full: 'US-CA',
                },
                place: { name: 'San Francisco' },
            },
            coordinates: {
                latitude: 37.7749,
                longitude: -122.4194,
                accuracy: 'rooftop',
            },
        },
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-74.006, 40.7128],
        },
        properties: {
            name: 'New York',
            mapbox_id: '2',
            feature_type: 'place',
            context: {
                country: {
                    name: 'United States',
                    country_code: 'US',
                    country_code_alpha_3: 'USA',
                },
                region: {
                    name: 'New York',
                    region_code: 'NY',
                    region_code_full: 'US-NY',
                },
                place: { name: 'New York' },
            },
            coordinates: {
                latitude: 40.7128,
                longitude: -74.006,
            },
        },
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [2.3522, 48.8566],
        },
        properties: {
            name: 'Paris',
            mapbox_id: '3',
            feature_type: 'place',
            context: {
                country: {
                    name: 'France',
                    country_code: 'FR',
                    country_code_alpha_3: 'FRA',
                },
                region: {
                    name: 'Île-de-France',
                    region_code: 'IDF',
                    region_code_full: 'FR-IDF',
                },
                place: { name: 'Paris' },
            },
            coordinates: {
                latitude: 48.8566,
                longitude: 2.3522,
            },
        },
    },
];

export default function ProjectsLocations() {
    const [selectedLocation, setSelectedLocation] = useState<LocationFeature | null>(null);

    const handlePopUpOn = (data: LocationFeature | null) => setSelectedLocation(data);
    const handlePopUpOff = () => setSelectedLocation(null);

    return (
        <>
            {locations.map((location) => (
                <LocationMarker key={location.properties.name} location={location} onClick={handlePopUpOn} />
            ))}
            {selectedLocation && <LocationPopup location={selectedLocation} onClose={handlePopUpOff} />}
        </>
    );
}
