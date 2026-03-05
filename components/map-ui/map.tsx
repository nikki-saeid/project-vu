'use client';

import MapProvider from '@/lib/providers/map-provider';
import { useRef } from 'react';
import MapCotrols from './map-controls';
import { ChildrenProp } from '@/lib/types/common';

export default function Map({ children }: ChildrenProp) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="w-full h-150 rounded-lg overflow-hidden relative">
            <div id="map-container" ref={mapContainerRef} className="absolute inset-0 h-full w-full" />

            <MapProvider
                mapContainerRef={mapContainerRef}
                initialViewState={{
                    longitude: -122.4194,
                    latitude: 37.7749,
                    zoom: 10,
                }}
            >
                <div className="z-50 absolute top-6 right-6">
                    <MapCotrols />
                </div>
                {children}
            </MapProvider>
        </div>
    );
}
