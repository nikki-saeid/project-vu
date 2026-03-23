import type { Database } from './supabase';

// Shared API response types
export type ProjectImageResponse = Omit<Database['public']['Tables']['project_image']['Row'], 'created_at' | 'id'>;

export type ProjectWithImages = Database['public']['Tables']['projects']['Row'] & {
    project_image: Database['public']['Tables']['project_image']['Row'][];
    lng?: number;
    lat?: number;
};

export type ProjectWithImagesAndPagination = {
    data: ProjectWithImages[];
    lastPage: number;
    total: number;
};

export type AdminAnalyticsResponse = {
    activeSubscriptions: number;
};

export type ParamsId = ContextParams<{ id: string }>;
export type ParamsSlug = ContextParams<{ slug: string }>;
export type ContextParams<T> = {
    params: Promise<T>;
};

export type ErrorThrown = {
    error: Error;
    status: number;
};

export function isErrorThrown(error: unknown): error is ErrorThrown {
    return typeof error === 'object' && error !== null && 'error' in error && 'status' in error && error.error instanceof Error;
}
