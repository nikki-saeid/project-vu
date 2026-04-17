-- PostGIS: allow authenticated to use schema and read catalog (needed for geography type)
GRANT USAGE ON SCHEMA postgis TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA postgis TO authenticated;

GRANT USAGE ON SCHEMA postgis TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA postgis TO service_role;
