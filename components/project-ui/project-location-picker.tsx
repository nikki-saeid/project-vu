import type { ProjectLocationPickerProps } from '@/lib/types/forms';
import { memo } from 'react';
import Map from '../map-ui/map';
import ProjectLocationPickerInner from './project-location-picker-inner';

function ProjectLocationPicker({ onSearchedLocationChange, onEditLocation }: ProjectLocationPickerProps) {
    return (
        <Map
            className="h-100"
            isSearchable={true}
            initialViewState={
                onEditLocation && {
                    longitude: onEditLocation?.geometry.coordinates[0],
                    latitude: onEditLocation?.geometry.coordinates[1],
                    zoom: 10,
                }
            }
        >
            <ProjectLocationPickerInner onEditLocation={onEditLocation} onSearchedLocationChange={onSearchedLocationChange} />
        </Map>
    );
}

export default memo(ProjectLocationPicker);
