import type { LocationMarkerProps } from '@/lib/types/map';
import { IconCircleFilled } from '@tabler/icons-react';
import Marker from './map-marker';

export function LocationMarker({ location, onClick }: LocationMarkerProps) {
    return (
        <Marker
            longitude={location?.geometry.coordinates[0] ?? 0}
            latitude={location?.geometry.coordinates[1] ?? 0}
            data={location}
            onClick={({ data }) => {
                onClick?.(data);
            }}
        >
            <div className="z-1000 rounded-full flex items-center justify-center transform transition-all duration-200 bg-background text-foreground shadow-lg size-5 cursor-pointer hover:scale-110">
                <IconCircleFilled className="size-4.5" />
            </div>
        </Marker>
    );
}
