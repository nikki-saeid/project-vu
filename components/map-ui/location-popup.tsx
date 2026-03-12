import type { LocationPopupProps } from '@/lib/types/map';
import { IconX } from '@tabler/icons-react';
import ProjectCard from '../project-ui/project-card';
import { Button } from '../ui/button';
import Popup from './map-popup';

export function LocationPopup({ location, onClose, project }: LocationPopupProps) {
    if (!location) return null;

    const { properties, geometry } = location;

    const lat = geometry?.coordinates?.[1] || properties?.coordinates?.latitude;
    const lng = geometry?.coordinates?.[0] || properties?.coordinates?.longitude;

    return (
        <Popup
            latitude={lat}
            longitude={lng}
            // onClose={onClose}
            offset={15}
            closeButton={false}
            closeOnClick={false}
            focusAfterOpen={false}
        >
            <ProjectCard
                {...project}
                project_image={project?.project_image ?? []}
                action={
                    <Button size="icon-xs" className="rounded-full shadow-xs" variant="secondary" onClick={onClose}>
                        <IconX />
                    </Button>
                }
            />
        </Popup>
    );
}
