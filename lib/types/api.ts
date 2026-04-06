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
export type ContextParams<T = Record<string, string>> = {
    params: Promise<T>;
};

export type ControllerProps<T = Record<string, string>> = {
    req: NextRequest;
    contextParams: ContextParams<T>;
    contextSearchParams?: URLSearchParams;
};

export type ControllerPropsPrivate<T = Record<string, string>> = ControllerProps<T> & { user: User };
export type ControllerPropsPublic<T = Record<string, string>> = ControllerProps<T> & { user: User | null };

export type NextFunctionPrivate<T = Record<string, string>> = (props: ControllerPropsPrivate<T>) => Promise<Response>;
export type NextFunctionPublic<T = Record<string, string>> = (props: ControllerPropsPublic<T>) => Promise<Response>;

export type ErrorThrown = {
    error: Error;
    status: number;
};

export function isErrorThrown(error: unknown): error is ErrorThrown {
    return typeof error === 'object' && error !== null && 'error' in error && 'status' in error && error.error instanceof Error;
}

// ----------- service

export type UsersWithPagination = { users: User[]; aud: string } & Pagination;
