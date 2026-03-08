import { createContext, useContext } from 'react';
import { LocationFeature } from '../types/features';

interface MapContextType {
    map: mapboxgl.Map;
    searchedLocation: LocationFeature | null;
    setSearchedLocation: (location: LocationFeature | null) => void;
}

export const MapContext = createContext<MapContextType | null>(null);

export function useMap() {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
}
