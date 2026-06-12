INSERT INTO storage.buckets (id, name, public, cors_rules)
VALUES (
  'businesses',
  'businesses', 
  true,
  '[{"allowedOrigins":["*"],"allowedMethods":["GET","HEAD"],"allowedHeaders":["*"],"maxAgeSeconds":3600}]'::jsonb
)
ON CONFLICT (id) DO UPDATE
SET cors_rules = '[{"allowedOrigins":["*"],"allowedMethods":["GET","HEAD"],"allowedHeaders":["*"],"maxAgeSeconds":3600}]'::jsonb;