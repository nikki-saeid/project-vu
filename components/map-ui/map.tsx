'use client';

import MapProvider from '@/lib/providers/map-provider';
import { MapWrapperProps } from '@/lib/types/features';
import { cn } from '@/lib/utils';
import { memo, useRef } from 'react';
import MapCotrols from './map-controls';
import MapSearch from './map-search';

function Map({ children, className = '', isSearchable = true, fullHeight = false }: MapWrapperProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            className={cn(
                'w-full rounded-lg overflow-hidden relative',
                fullHeight ? 'min-h-[300px] h-screen sm:h-dvh' : 'h-150',
                className,
            )}
        >
            <div id="map-container" ref={mapContainerRef} className="absolute inset-0 h-full w-full" />

            <MapProvider
                mapContainerRef={mapContainerRef}
                initialViewState={{
                    longitude: -122.4194,
                    latitude: 37.7749,
                    zoom: 10,
                }}
            >
                <div className="z-50 absolute bottom-6 right-6">
                    <MapCotrols />
                </div>
                {isSearchable && (
                    <div className="z-50 absolute top-6 left-6">
                        <MapSearch />
                    </div>
                )}
                {children}
            </MapProvider>
        </div>
    );
}

export default memo(Map);
