import type { LocationFeature } from '@/lib/types/map';
import { MAP_DEFAULT_VIEW_STATE } from '../constants/map';

export type ProjectWithCoordinates = {
    id: string;
    title: string | null;
    address?: string | null;
    lng?: number;
    lat?: number;
};

/**
 * Convert a project with lng/lat (from PostGIS) to a LocationFeature for map markers.
 */
export function projectToLocationFeature(project: ProjectWithCoordinates): LocationFeature | null {
    if (project.lng == null || project.lat == null) return null;
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [project.lng, project.lat],
        },
        properties: {
            name: project.title ?? 'Project',
            mapbox_id: project.id,
            feature_type: 'place',
            context: {},
            coordinates: {
                latitude: project.lat,
                longitude: project.lng,
            },
            ...(project.address && { address: project.address, full_address: project.address }),
        },
    };
}

export function getCenterLatLng(projects: ProjectWithCoordinates[]) {
    if (!projects.length)
        return {
            latitude: MAP_DEFAULT_VIEW_STATE.latitude,
            longitude: MAP_DEFAULT_VIEW_STATE.longitude,
        };

    const sum = projects.reduce(
        (acc, curr) => {
            acc.lat += curr.lat ?? 0;
            acc.lng += curr.lng ?? 0;
            return acc;
        },
        { lat: 0, lng: 0 },
    );

    return {
        latitude: sum.lat / projects.length,
        longitude: sum.lng / projects.length,
    };
}

/**
 * Returns the longest (greatest) distance in meters between any two points in the array.
 * Uses the haversine formula for accuracy.
 */
export function getLongestDistance(projects: ProjectWithCoordinates[]): number {
    if (projects.length < 2) return 0;

    function toRad(x: number) {
        return (x * Math.PI) / 180;
    }

    function haversineDistance(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
        const R = 6371000; // Earth's radius in meters
        const dLat = toRad(b.lat - a.lat);
        const dLng = toRad(b.lng - a.lng);
        const lat1 = toRad(a.lat);
        const lat2 = toRad(b.lat);

        const hav = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
        return R * c;
    }

    let maxDistance = 0;

    for (let i = 0; i < projects.length; i++) {
        for (let j = i + 1; j < projects.length; j++) {
            const dist = haversineDistance(
                { lat: projects[i].lat ?? 0, lng: projects[i].lng ?? 0 },
                { lat: projects[j].lat ?? 0, lng: projects[j].lng ?? 0 },
            );
            if (dist > maxDistance) maxDistance = dist;
        }
    }

    return maxDistance;
}

export function getZoomLevelForLocations(projects: ProjectWithCoordinates[]) {
    const BASE_ZOOM = 11;

    if (!projects.length) return BASE_ZOOM; // Fallback default zoom
    const longestDistance = getLongestDistance(projects);

    const distanceTickMeters = 25000;
    const zoomTick = 0.5;

    const ticks = Math.floor(longestDistance / distanceTickMeters);
    return Math.max(3.25, BASE_ZOOM - ticks * zoomTick);
}
