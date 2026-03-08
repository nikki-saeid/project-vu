import { LocationFeature } from '@/lib/types/features';
import Map from '../map-ui/map';
import ProjectLocationPickerInner from './project-location-picker-inner';
import { memo } from 'react';

type ProjectLocationPickerProps = {
    onSearchedLocationChange: (location: LocationFeature) => void;
};

function ProjectLocationPicker({ onSearchedLocationChange }: ProjectLocationPickerProps) {
    return (
        <Map className="h-100" isSearchable={true}>
            <ProjectLocationPickerInner onSearchedLocationChange={onSearchedLocationChange} />
        </Map>
    );
}

export default memo(ProjectLocationPicker);
