-- Storage: businesses bucket — public read; authenticated CRUD in own folder (folder = user id)
CREATE POLICY "Give users access to own folder s5dqi6_0"
  ON "storage"."objects" FOR SELECT TO public
  USING ((bucket_id = 'businesses') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "Give users access to own folder s5dqi6_1"
  ON "storage"."objects" FOR DELETE TO public
  USING ((bucket_id = 'businesses') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "Give users access to own folder s5dqi6_2"
  ON "storage"."objects" FOR UPDATE TO public
  USING ((bucket_id = 'businesses') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "Give users access to own folder s5dqi6_3"
  ON "storage"."objects" FOR INSERT TO public
  WITH CHECK ((bucket_id = 'businesses') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "get logo public s5dqi6_0"
  ON "storage"."objects" FOR SELECT TO public
  USING (bucket_id = 'businesses');

-- Storage: projects bucket — own folder CRUD; public read
CREATE POLICY "Give users access to own folder 1iiiika_0"
  ON "storage"."objects" FOR INSERT TO public
  WITH CHECK ((bucket_id = 'projects') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "Give users access to own folder 1iiiika_1"
  ON "storage"."objects" FOR UPDATE TO public
  USING ((bucket_id = 'projects') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "Give users access to own folder 1iiiika_2"
  ON "storage"."objects" FOR SELECT TO public
  USING ((bucket_id = 'projects') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "Give users access to own folder 1iiiika_3"
  ON "storage"."objects" FOR DELETE TO public
  USING ((bucket_id = 'projects') AND ((auth.uid())::text = (storage.foldername(name))[1]));

CREATE POLICY "get images public 1iiiika_0"
  ON "storage"."objects" FOR SELECT TO public
  USING (bucket_id = 'projects');
