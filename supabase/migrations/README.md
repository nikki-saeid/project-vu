# Optimized migrations

Reorganized from the original 21 migrations into 10 ordered files:

| Migration | Purpose |
|-----------|--------|
| `20260314000001_init.sql` | PostGIS schema + extensions (postgis, uuid-ossp, pgcrypto) |
| `20260314000002_types.sql` | Enum types: business_role, page_status, user_role |
| `20260314000003_tables.sql` | Tables: businesses, projects, project_image, subscriptions (no `profiles` — dropped in original) |
| `20260314000004_constraints_and_relationships.sql` | PKs, unique (slug, email), FKs (user_id → auth.users; project_id → projects; business_id → businesses) |
| `20260314000005_functions.sql` | access_token_with_role_hook, rls_auto_enable |
| `20260314000006_rls_enable.sql` | Enable RLS on all 4 tables |
| `20260314000007_policies.sql` | RLS policies for businesses, projects, project_image |
| `20260314000008_permissions.sql` | Schema/function/table grants and default privileges |
| `20260314000009_postgis_permissions.sql` | PostGIS schema usage for authenticated |
| `20260314000010_storage_policies.sql` | Storage policies for `businesses` and `projects` buckets |

**To use:** Backup current migrations, then replace with this folder:

```bash
cp -r supabase/migrations supabase/migrations_backup
rm -rf supabase/migrations
mv supabase/migrations_optimized supabase/migrations
```

For a **fresh** Supabase project, run these migrations in order. If you already have the DB from the old migrations, either reset the DB and run the new set, or keep the old migrations (this set is for clean installs / new projects).
