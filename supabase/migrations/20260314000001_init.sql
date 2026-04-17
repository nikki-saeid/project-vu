-- Init: schema and extensions (postgis, etc.)
CREATE SCHEMA IF NOT EXISTS "postgis";
ALTER SCHEMA "postgis" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "postgis";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
