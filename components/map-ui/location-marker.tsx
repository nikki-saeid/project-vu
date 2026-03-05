import { LocationMarkerProps } from '@/lib/types/features';
import { IconCircleFilled } from '@tabler/icons-react';
import Marker from './map-marker';

export function LocationMarker({ location, onClick }: LocationMarkerProps) {
    return (
        <Marker
            longitude={location.geometry.coordinates[0]}
            latitude={location.geometry.coordinates[1]}
            data={location}
            onClick={({ data }) => {
                onClick(data);
            }}
        >
            <div className="rounded-full flex items-center justify-center transform transition-all duration-200 bg-primary-foreground text-primary shadow-lg size-5 cursor-pointer hover:scale-110">
                <IconCircleFilled className="size-4.5" />
            </div>
        </Marker>
    );
}
