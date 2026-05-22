ALTER TABLE "public"."reviews" ENABLE ROW LEVEL SECURITY;

-- select
CREATE POLICY "Allow public read access for reviews"
  ON "public"."reviews"
  FOR SELECT
  TO public
  USING (true);

-- update
CREATE POLICY "Allow public update access for reviews"
  ON "public"."reviews"
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- delete
CREATE POLICY "Allow delete for review owner via business"
  ON "public"."reviews"
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "public"."businesses"
      WHERE "businesses"."id" = "reviews"."business_id"
        AND "businesses"."user_id" = (SELECT auth.uid())
    )
  );

-- insert
CREATE POLICY "Allow insert for authenticated users"
  ON "public"."reviews"
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "public"."businesses"
      WHERE "businesses"."id" = "reviews"."business_id"
        AND "businesses"."user_id" = (SELECT auth.uid())
    )
  );