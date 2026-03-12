const SYDNEY_LATITUDE = -33.8688;
const SYDNEY_LONGITUDE = 151.2077;

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
        DEFAULT_PROXIMITY: [SYDNEY_LONGITUDE, SYDNEY_LATITUDE] as [number, number], // Sydney
    },
} as const;

export const MAP_DEFAULT_VIEW_STATE = {
    latitude: SYDNEY_LATITUDE,
    longitude: SYDNEY_LONGITUDE,
    zoom: 10,
} as const;
