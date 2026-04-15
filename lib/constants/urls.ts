export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const API_URL = BASE_URL + '/api';

export const PUBLIC_URLS = ['/', '/terms-and-conditions', '/privacy-policy'];
export const AUTH_URLS = ['/login', '/sign-up', '/forgot-password', '/sign-up-success', '/update-password'];
export const DEMO_SLUG = 'demo-contractor';
export const DEMO_URL = BASE_URL + '/page/' + DEMO_SLUG;
export const LIVE_MAP_URL = BASE_URL + '/embed/demo-contractor';
