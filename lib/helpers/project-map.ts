import type { LocationFeature } from '@/lib/types/map';

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
