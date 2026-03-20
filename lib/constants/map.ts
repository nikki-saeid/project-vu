const MELBOURNE_LATITUDE = -37.8136;
const MELBOURNE_LONGITUDE = 144.9631;

export const MAP_CONSTANTS = {
    FLY_TO: {
        ZOOM: 14,
        SPEED: 4,
        DURATION: 1000,
    },
    SEARCH: {
        DEBOUNCE_MS: 400,
        DEFAULT_LIMIT: 5,
        DEFAULT_COUNTRY: 'AU',
        DEFAULT_PROXIMITY: [MELBOURNE_LONGITUDE, MELBOURNE_LATITUDE] as [number, number],
    },
} as const;

export const MAP_DEFAULT_VIEW_STATE = {
    latitude: MELBOURNE_LATITUDE,
    longitude: MELBOURNE_LONGITUDE,
    zoom: 10,
} as const;
