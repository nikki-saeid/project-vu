export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
export const API_URL = BASE_URL + '/api';

export const PUBLIC_URLS = ['/'];
export const AUTH_URLS = [
    '/login',
    '/sign-up',
    '/forgot-password',
    '/sign-up-success',
    '/update-password',
    '/terms-and-conditions',
    '/privacy-policy',
];
export const DEMO_URL = BASE_URL + '/page/demo-contractor';
export const LIVE_MAP_URL = BASE_URL + '/embed/demo-contractor';
