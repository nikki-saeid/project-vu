-- RLS policies: businesses (own row by user_id)
CREATE POLICY "Enable insert for users based on user_id"
  ON "public"."businesses" FOR INSERT TO "authenticated"
  WITH CHECK ((SELECT auth.uid()) = "user_id");

CREATE POLICY "Enable users to update their own data only"
  ON "public"."businesses" FOR UPDATE TO "authenticated"
  USING ((SELECT auth.uid()) = "user_id")
  WITH CHECK ((SELECT auth.uid()) = "user_id");

CREATE POLICY "Enable users to view their own data only"
  ON "public"."businesses" FOR SELECT TO "authenticated"
  USING ((SELECT auth.uid()) = "user_id");

CREATE POLICY "Enable read access for all users"
  ON "public"."businesses" FOR SELECT TO public
  USING (true);

-- RLS policies: projects (public read; mutate only for business owner)
CREATE POLICY "Allow public read access for projects"
  ON "public"."projects" FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow insert for business owner"
  ON "public"."projects" FOR INSERT TO "authenticated"
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "public"."businesses"
      WHERE "businesses"."id" = "business_id" AND "businesses"."user_id" = (SELECT auth.uid())
    )
  );

CREATE POLICY "Allow update for business owner"
  ON "public"."projects" FOR UPDATE TO "authenticated"
  USING (
    EXISTS (
      SELECT 1 FROM "public"."businesses"
      WHERE "businesses"."id" = "projects"."business_id" AND "businesses"."user_id" = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "public"."businesses"
      WHERE "businesses"."id" = "projects"."business_id" AND "businesses"."user_id" = (SELECT auth.uid())
    )
  );

CREATE POLICY "Allow delete for business owner"
  ON "public"."projects" FOR DELETE TO "authenticated"
  USING (
    EXISTS (
      SELECT 1 FROM "public"."businesses"
      WHERE "businesses"."id" = "projects"."business_id" AND "businesses"."user_id" = (SELECT auth.uid())
    )
  );

-- ----------------- subscription
CREATE POLICY "Allow select for business owner"
  ON "public"."subscriptions"
  FOR SELECT
  TO "authenticated"
  USING (
    EXISTS (
      SELECT 1 FROM "public"."businesses"
      WHERE "businesses"."id" = "subscriptions"."business_id"
        AND "businesses"."user_id" = auth.uid()
    )
  );