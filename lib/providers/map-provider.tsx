'use client';

import MapSkeleton from '@/components/skeleton-ui/map-skeleton';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { MapContext } from '../contexts/map-context';
import { LocationFeature, MapProps } from '../types/features';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapProvider({ mapContainerRef, initialViewState, children }: MapProps) {
    const map = useRef<mapboxgl.Map | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
    const [searchedLocation, setSearchedLocation] = useState<LocationFeature | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current || map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard',
            center: [initialViewState.longitude, initialViewState.latitude],
            zoom: initialViewState.zoom,
            attributionControl: false,
        });

        map.current.on('load', () => {
            setLoaded(true);
            setMapInstance(map.current);
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [initialViewState, mapContainerRef]);

    return (
        <div className="z-1000">
            <MapContext.Provider value={{ map: mapInstance!, searchedLocation, setSearchedLocation }}>
                {!loaded && <MapSkeleton />}
                {children}
            </MapContext.Provider>
        </div>
    );
}
