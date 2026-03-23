import { AUTH_URLS, PUBLIC_URLS } from '@/lib/constants/urls';
import { NextRequest, NextResponse } from 'next/server';

export function redirection(request: NextRequest, path: string) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
}

export function isPublic(path: string) {
    return PUBLIC_URLS.includes(path) || path.startsWith('/embed') || path.startsWith('/page');
}

export function isAuth(path: string) {
    return AUTH_URLS.includes(path);
}
