import type { Enums, Tables } from './supabase';

export type Business = Tables<'businesses'>;
export type Profile = Tables<'profiles'>;
export type Project = Tables<'projects'>;
export type ProjectImage = Tables<'project_image'>;
export type Subscription = Tables<'subscriptions'>;
export type BusinessTypeEnum = Enums<'business_type'>;
export type PageStatusEnum = Enums<'page_status'>;
