'use client';

import MapProvider from '@/lib/providers/map-provider';
import type { MapWrapperProps } from '@/lib/types/dashboard';
import { cn } from '@/lib/utils/classes-merge';
import { memo, useRef } from 'react';
import MapControls from './map-controls';
import MapSearch from './map-search';
import { MAP_DEFAULT_VIEW_STATE } from '@/lib/constants/map';

function Map({ children, className = '', isSearchable = true, fullHeight = false, initialViewState }: MapWrapperProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className={cn('w-full rounded-lg overflow-hidden relative', fullHeight ? 'min-h-75 h-screen sm:h-dvh' : 'h-150', className)}>
            <div id="map-container" ref={mapContainerRef} className="absolute z-1 inset-0 h-full w-full" />
            <MapProvider mapContainerRef={mapContainerRef} initialViewState={initialViewState ?? MAP_DEFAULT_VIEW_STATE}>
                <div className="z-50 absolute bottom-6 right-6">
                    <MapControls />
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
