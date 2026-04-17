-- Auth hook: inject user_role from app_metadata into JWT claims
CREATE OR REPLACE FUNCTION public.access_token_with_role_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  claims jsonb := coalesce(event->'claims', '{}'::jsonb);
  user_role text;
BEGIN
  user_role := coalesce(
    event->'user'->'app_metadata'->>'user_role',
    'authenticated'
  );
  claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role), true);
  RETURN jsonb_set(event, '{claims}', claims, true);
END;
$$;
ALTER FUNCTION "public"."access_token_with_role_hook"(event jsonb) OWNER TO "postgres";

-- Auto-enable RLS on new public tables
CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS event_trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT * FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table', 'partitioned table')
  LOOP
    IF cmd.schema_name IS NOT NULL AND cmd.schema_name = 'public' THEN
      BEGIN
        EXECUTE format('ALTER TABLE IF EXISTS %s ENABLE ROW LEVEL SECURITY', cmd.object_identity);
      EXCEPTION WHEN OTHERS THEN
        RAISE LOG 'rls_auto_enable: failed on %', cmd.object_identity;
      END;
    END IF;
  END LOOP;
END;
$$;
ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";
