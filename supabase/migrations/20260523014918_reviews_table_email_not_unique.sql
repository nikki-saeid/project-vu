alter table "public"."reviews" drop constraint "reviews_email_key";

drop index if exists "public"."reviews_email_key";


