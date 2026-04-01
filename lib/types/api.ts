import { NextRequest } from 'next/server';
import type { Database } from './supabase';
import { User } from '@supabase/supabase-js';

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

export type AdminAnalyticsResponse = {
    activeSubscriptions: number;
};

export type ParamsId = { id: string };
export type ParamsSlug = { slug: string };
export type ParamsPlan = { plan: string };
export type ContextParams<T> = {
    params: Promise<T>;
};

export type ControllerProps<T = null> = {
    req: NextRequest;
    user: User;
    context?: ContextParams<T>;
};

export type ErrorThrown = {
    error: Error;
    status: number;
};

export function isErrorThrown(error: unknown): error is ErrorThrown {
    return typeof error === 'object' && error !== null && 'error' in error && 'status' in error && error.error instanceof Error;
}

// ----------- service

export type sls = { ok: 'l' };
