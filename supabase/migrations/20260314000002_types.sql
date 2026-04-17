CREATE TYPE "public"."page_status" AS ENUM (
    'draft',
    'live'
);

ALTER TYPE "public"."page_status" OWNER TO "postgres";