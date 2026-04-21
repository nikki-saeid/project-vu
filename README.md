# Project Vu

Project Vu is a Next.js 16 application for business/project visibility with:

- Public pages and embeddable live pages
- Authenticated user dashboard flows
- Admin management and analytics
- API routes for user/admin/public/Stripe integrations
- Supabase-backed data and authentication

## Tech Stack

- Framework: `Next.js` (App Router) + `React` + `TypeScript`
- Styling: `Tailwind CSS` + `shadcn/ui`-style component patterns
- Data/Auth: `Supabase` (`@supabase/ssr`, `@supabase/supabase-js`)
- Billing: `Stripe`
- Maps: `Mapbox`
- Validation: `zod`
- Package manager: `pnpm`

## Project Structure

Top-level structure:

```text
project-vu/
├── app/                    # Next.js routes (pages + API routes)
├── components/             # Shared and feature UI components
├── hooks/                  # Reusable React hooks
├── lib/                    # Utilities, clients, providers, constants, types
├── modules/                # Backend architecture (controllers/services/repositories)
├── public/                 # Static assets
├── scripts/                # Local scripts (ex: database seeding)
├── styles/                 # Global styles and font helpers
└── supabase/               # Supabase config + SQL migrations
```

### `app/` Route Groups and Pages

The app uses route groups to organize flows:

- `app/(marketing)/...`
  - Marketing/home and legal pages (`privacy-policy`, `terms-and-conditions`)
- `app/(auth)/...`
  - Authentication pages (`login`, `sign-up`, `forgot-password`, `update-password`)
- `app/(user)/(authenticated)/(before-setup)/onboarding/...`
  - Onboarding flow (`subscription-plan`, `checkout`, `business-profile`)
- `app/(user)/(authenticated)/(after-setup)/dashboard/...`
  - Main user dashboard (`projects`, `billing`, `account`, `live-page`, `embedded-map`)
- `app/(user)/(public)/page/[slug]/...`
  - Public business/project pages
- `app/(user)/(public)/embed/[slug]/...`
  - Embeddable public page variant
- `app/(admin)/admin/...`
  - Admin overview and user management

### `app/api/` API Routes

API endpoints live in `app/api/**/route.ts` and are grouped by domain:

- `app/api/user/...`
  - Current user profile/business/project/subscription operations
- `app/api/admin/...`
  - Admin analytics, subscriptions, and user moderation
- `app/api/public/...`
  - Public business and project data by slug/id
- `app/api/stripe/...`
  - Checkout/subscription/invoice/webhook integration

### `components/` Component Organization

Components are grouped by scope/feature:

- `components/ui/` - base UI primitives
- `components/auth-ui/` - auth-related form/ui pieces
- `components/business-ui/` - business profile and details UI
- `components/project-ui/` - project CRUD and project details UI
- `components/dashboard-ui/` - dashboard layout/navigation/cards
- `components/public-pages-ui/` - public-facing navbar/footer/page sections
- `components/subscription-ui/` - billing/subscription interactions
- `components/map-ui/` - map rendering/search/markers/popups
- `components/skeleton-ui/`, `components/loader-ui/` - loading states

### `modules/` Backend Layered Architecture

The `modules/` folder follows a layered service pattern:

- `modules/controllers/`
  - HTTP input/output orchestration and response shaping
- `modules/services/`
  - Core domain/business logic
- `modules/repositories/`
  - Data access and third-party gateway logic
- `modules/middlewares/`
  - Request guards (auth/public checks)

## Getting Started (Development)

### Prerequisites

- Node.js `>= 20` (recommended)
- `pnpm` installed globally
- Supabase CLI (for local DB workflows)
- Stripe CLI (for local webhook testing)

### 1) Install Dependencies

```bash
pnpm install
```

### 2) Configure Environment Variables

Create a local environment file:

```bash
cp .env .env.local
```

Or create `.env.local` manually and define the required variables:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_MONTHLY_PRICE_ID`
- `STRIPE_6_MONTHLY_PRICE_ID`
- `STRIPE_YEARLY_PRICE_ID`
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_MAPBOX_SESSION_TOKEN`

> Notes:
>
> - Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
> - Secret keys must only be set in server/runtime envs.

### 3) Start Development Server

```bash
pnpm dev
```

Local app URL: `http://localhost:3000`

## Scripts

Main scripts from `package.json`:

- `pnpm dev` - Start Next.js in development mode
- `pnpm build` - Build production bundle
- `pnpm start` - Run production server from build output
- `pnpm lint` - Run ESLint

Supabase helper scripts:

- `pnpm supa-gen-types` - Generate local Supabase TypeScript types
- `pnpm supa-config-push` - Push local Supabase config
- `pnpm supa-reset` - Restart local Supabase stack
- `pnpm supa-db-reset` - Reset local DB, seed, regenerate types
- `pnpm supa-db-remote-reset` - Reset linked remote DB, seed
- `pnpm supa-seed` - Run seed script (`scripts/seed.ts`)
- `pnpm supa-link` - Login + link to Supabase project

Stripe helper scripts:

- `pnpm stripe-webhook-local` - Forward Stripe webhooks to local API
- `pnpm stripe-webhook-remote` - Forward Stripe webhooks to production URL

## Database and Migrations

Supabase configuration and SQL live under:

- `supabase/config.toml`
- `supabase/migrations/*.sql`

Typical local DB workflow:

```bash
pnpm supa-reset
pnpm supa-db-reset
```

## Build and Run (Production)

### Local Production Smoke Test

```bash
pnpm build
pnpm start
```

### Production Environment

In production, set the same environment variables used in development, with production values:

- Use production Supabase project URL/keys
- Use production Stripe keys and price IDs
- Use production Mapbox token
- Set `NEXT_PUBLIC_BASE_URL` to the deployed domain

Then deploy as a standard Next.js app (Node runtime) with build + start flow.

## Where To Find Things Quickly

- Pages and route layout: `app/`
- API handlers: `app/api/`
- Shared/feature components: `components/`
- Business logic and data layer: `modules/`
- API clients/helpers/types/constants: `lib/`
- DB migrations and local Supabase setup: `supabase/`
- Static assets: `public/`

## Recommended Team Conventions

- Keep components small and feature-oriented (follow existing `*-ui` grouping).
- Reuse `components/ui/` primitives before creating new base controls.
- Keep API handlers thin; move logic into `modules/services`.
- Keep data access in `modules/repositories`.
- Validate request payloads and keep response contracts explicit.
