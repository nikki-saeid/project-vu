import type { ProjectLocationPickerProps } from '@/lib/types/forms';
import { memo } from 'react';
import Map from '../map-ui/map';
import ProjectLocationPickerInner from './project-location-picker-inner';

function ProjectLocationPicker({ onSearchedLocationChange }: ProjectLocationPickerProps) {
    return (
        <Map className="h-100" isSearchable={true}>
            <ProjectLocationPickerInner onSearchedLocationChange={onSearchedLocationChange} />
        </Map>
    );
}

export default memo(ProjectLocationPicker);
