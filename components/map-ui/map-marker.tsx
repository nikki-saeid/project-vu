'use client';

import { useMap } from '@/lib/contexts/map-context';
import type { MarkerProps } from '@/lib/types/map';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

export default function Marker({ children, latitude, longitude, data, onHover, onClick, ...props }: MarkerProps) {
    const { map } = useMap();
    const markerRef = useRef<HTMLDivElement | null>(null);
    const markerInstanceRef = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!map || !map.isStyleLoaded()) return;

        const markerEl = markerRef.current;
        if (!map || !markerEl) return;

        const handleHover = (isHovered: boolean) => {
            if (onHover && markerInstanceRef.current) {
                onHover({
                    isHovered,
                    position: { longitude, latitude },
                    marker: markerInstanceRef.current,
                    data,
                });
            }
        };

        const handleClick = () => {
            if (onClick && markerInstanceRef.current) {
                onClick({
                    position: { longitude, latitude },
                    marker: markerInstanceRef.current,
                    data,
                });
            }
        };

        const handleMouseEnter = () => handleHover(true);
        const handleMouseLeave = () => handleHover(false);

        // Add event listeners
        markerEl.addEventListener('mouseenter', handleMouseEnter);
        markerEl.addEventListener('mouseleave', handleMouseLeave);
        markerEl.addEventListener('click', handleClick);

        // Marker options
        const options = {
            element: markerEl,
            ...props,
        };

        markerInstanceRef.current = new mapboxgl.Marker(options).setLngLat([longitude, latitude]).addTo(map);

        return () => {
            // Cleanup on unmount
            if (markerInstanceRef.current) markerInstanceRef.current.remove();
            if (markerEl) {
                markerEl.removeEventListener('mouseenter', handleMouseEnter);
                markerEl.removeEventListener('mouseleave', handleMouseLeave);
                markerEl.removeEventListener('click', handleClick);
            }
        };
    }, [data, latitude, longitude, map, onClick, onHover, props]);

    return (
        <div>
            <div ref={markerRef}>{children}</div>
        </div>
    );
}
