import { getUser } from '@/modules/services/auth.service';
import { isAuth, isPublic, redirection } from '@/modules/services/route.service';
import type { NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    const { user, response } = await getUser(request);
    const path = request.nextUrl.pathname;

    // public routes
    if (isPublic(path)) {
        return response;
    }

    // not authenticated
    if (!user) {
        if (isAuth(path)) {
            return response;
        }

        return redirection(request, '/login');
    }

    const isAdmin = user?.role === 'admin';

    // auth pages (login/register)
    if (isAuth(path)) {
        return redirection(request, isAdmin ? '/admin/overview' : '/dashboard/live-page');
    }

    // dashboard routes
    if (path.startsWith('/dashboard')) {
        if (isAdmin) return redirection(request, '/admin/overview');
        return response;
    }

    // admin routes
    if (path.startsWith('/admin')) {
        if (!isAdmin) return redirection(request, '/dashboard/live-page');
        return response;
    }

    return response;
}
