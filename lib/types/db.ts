import type { Enums, Tables } from './supabase';

export type Business = Tables<'businesses'>;
export type Project = Tables<'projects'>;
export type Subscription = Tables<'subscriptions'>;
export type PageStatusEnum = Enums<'page_status'>;
