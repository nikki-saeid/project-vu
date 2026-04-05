import { Pagination, User } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import type { Database } from './supabase';

// Shared API response types
export type ProjectWithLatLng = Database['public']['Tables']['projects']['Row'] & {
    lng?: number;
    lat?: number;
};

export type ProjectWithLatLngAndPagination = {
    data: ProjectWithLatLng[];
    lastPage: number;
    total: number;
};

export type ParamsId = { id: string };
export type ParamsSlug = { slug: string };
export type ParamsPlan = { plan: string };
export type ParamsStripeCustomerId = { stripeCustomerId: string };
export type SearchParamsMonth = { month: string };
export type ContextParams<T> = {
    params: Promise<T>;
};

export type ControllerProps<T = null> = {
    req: NextRequest;
    user: User;
    contextParams?: ContextParams<T>;
    contextSearchParams?: URLSearchParams;
};

export type NextFunction<T> = (props: ControllerProps<T>) => Promise<Response>;

export type ErrorThrown = {
    error: Error;
    status: number;
};

export function isErrorThrown(error: unknown): error is ErrorThrown {
    return typeof error === 'object' && error !== null && 'error' in error && 'status' in error && error.error instanceof Error;
}

// ----------- service

export type UsersWithPagination = { users: User[]; aud: string } & Pagination;
