-- Tables (final state; profiles table omitted — dropped in original migrations)
CREATE TABLE "public"."businesses" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "name" text,
    "type" text,
    "slug" text,
    "logo_url" text,
    "description" text,
    "phone" text,
    "website_url" text,
    "facebook_url" text,
    "instagram_url" text,
    "user_id" uuid NOT NULL,
    "email" text NOT NULL,
    "x_url" text,
    "project_type_tags" text[],
    "service_type_tags" text[],
    "page_status" "public"."page_status" NOT NULL DEFAULT 'draft'::public.page_status,
    "is_onboarded" boolean NOT NULL DEFAULT false
);

ALTER TABLE "public"."businesses" OWNER TO "postgres";

CREATE TABLE "public"."projects" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "address" text NOT NULL,
    "location" "postgis"."geography" NOT NULL,
    "images_urls" text[],
    "business_id" uuid NOT NULL,
    "made_at" timestamptz,
    "size" text
);

ALTER TABLE "public"."projects" OWNER TO "postgres";

CREATE TABLE "public"."subscriptions" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "business_id" uuid NOT NULL,
    "current_period_start" timestamptz,
    "current_period_end" timestamptz,
    "cancel_at_period_end" BOOLEAN,
    "stripe_subscription_id" TEXT ,
    "stripe_customer_id" TEXT UNIQUE,
    "status" TEXT NOT NULL,
    "price_id" TEXT,
    "plan" TEXT,
    "product_id" TEXT
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";