create extension if not exists "pg_cron" with schema "pg_catalog";

alter table "public"."businesses" add column "is_trial_email_reminder_sent" boolean;


