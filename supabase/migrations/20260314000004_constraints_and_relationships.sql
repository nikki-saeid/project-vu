-- Primary keys
ALTER TABLE ONLY "public"."businesses"
    ADD CONSTRAINT "business_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscription_pkey" PRIMARY KEY ("id");

-- Unique constraints
ALTER TABLE ONLY "public"."businesses"
    ADD CONSTRAINT "business_slug_key" UNIQUE ("slug");

CREATE UNIQUE INDEX businesses_email_key ON public.businesses USING btree (email);

ALTER TABLE ONLY "public"."businesses"
    ADD CONSTRAINT "businesses_email_key" UNIQUE USING INDEX "businesses_email_key";

-- Foreign keys (table relationships)
ALTER TABLE ONLY "public"."businesses"
    ADD CONSTRAINT "businesses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "project_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscription_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON UPDATE CASCADE ON DELETE CASCADE;