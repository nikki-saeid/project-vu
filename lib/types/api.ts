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
