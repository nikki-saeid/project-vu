import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// this is for the global middleware
export async function getUser(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    // With Fluid compute, don't put this client in a global environment
    // variable. Always create a new one on each request.
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                supabaseResponse = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
            },
        },
    });

    const { data } = await supabase.auth.getClaims();

    return {
        user: data?.claims ?? null,
        response: supabaseResponse,
    };
}
