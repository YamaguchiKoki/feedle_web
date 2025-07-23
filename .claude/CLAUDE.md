# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Conversation Guidelines

- 常に日本語で会話する

## Development Commands

### Core Development
- `npm run dev` - Start Next.js development server
- `npm run build` - Production build (sets NODE_ENV=production)
- `npm start` - Start production server
- `npm run scan` - Development with React Scan performance monitoring

### Code Quality
- `npm run check` - Run Biome linter and formatter checks
- `npm run check:fix` - Auto-fix Biome issues (includes format and organize imports)

### Database Operations
- `npm run generate` - Generate Drizzle migrations from schema changes
- `npm run push` - Apply migrations to local database
- `npm run migrate` - Apply migrations to production database
- `npm run db:reset` - Reset local Supabase database
- `npm run studio` - Open Supabase Studio at http://127.0.0.1:54323

### Supabase Local Development
```bash
# Start local Supabase stack (run from supabase/ directory)
supabase start
```

### Deployment
- `npm run deploy` - Deploy to Vercel production
- `npm run preview` - Create Vercel preview deployment

## Architecture Overview

### Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL via Supabase with Drizzle ORM
- **Authentication**: Supabase Auth
- **API Layer**: tRPC with React Query integration
- **Styling**: Tailwind CSS v4 with Radix UI components
- **State Management**: React Query for server state, React context for theme
- **Code Quality**: Biome for linting and formatting

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (home)/            # Dashboard and main app
│   ├── (landing)/         # Landing page
│   └── api/trpc/          # tRPC API routes
├── components/            # Reusable UI components
│   └── ui/               # Radix-based design system
├── db/                   # Database schema and connection
├── lib/                  # Core utilities
│   ├── supabase/         # Auth client/server setup
│   └── trpc/             # tRPC configuration
├── modules/              # Feature-based modules
│   ├── auth/             # Authentication logic
│   └── home/             # Dashboard features
└── hooks/                # Custom React hooks
```

### Database Schema
Core entities for content aggregation platform:
- `users` - User profiles (linked to Supabase Auth)
- `dataSources` - Content sources (Reddit, Twitter, YouTube, etc.)
- `userFetchConfigs` - User's data fetching configurations
- `userConditions` - Search/filter conditions per config
- `fetchedData` - Aggregated content with metadata

### Module Architecture
Features are organized in `src/modules/` with clean separation:
- `server/` - tRPC procedures and data access
- `ui/` - React components (components, layouts, sections, views)
- `constants/` - Static data and configuration

### API Layer
- **tRPC Router**: `src/lib/trpc/routers/_app.ts` - Main API entry point
- **Procedures**: Feature-specific routers in `src/modules/*/server/*/procedure.ts`
- **Authentication**: `baseProcedure` (public) vs `protectedProcedure` (auth required)

### Code Style
- **Biome Configuration**: Tab indentation, double quotes, import organization
- **Exclusions**: UI components (`src/components/ui/`) and mock data are excluded from linting
- **Japanese Comments**: Database schema includes Japanese documentation

### Authentication Flow
- Supabase Auth integration with server/client utilities
- Middleware handles auth state (`src/middleware.ts`)
- Protected routes require authentication via tRPC `protectedProcedure`

### Development Notes
- Mock data is used extensively during development phase
- Local Supabase instance for development
- Vercel deployment target with production database migrations
