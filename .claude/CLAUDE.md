# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

feedle-web is a content aggregation platform built with Next.js 15 (App Router), TypeScript, and deployed on Cloudflare Workers. It collects and organizes content from multiple social media platforms (Reddit, Twitter, YouTube, Instagram, HackerNews) using a Supabase backend.

## Development Commands

### Core Development
```bash
npm run dev              # Start development server
npm run build            # Production build 
npm run start            # Start production server
```

### Code Quality
```bash
npm run check            # Run Biome linter/formatter
npm run check:fix        # Auto-fix Biome issues
```

### Database Management
```bash
supabase start           # Start local Supabase (required for development)
npm run generate         # Generate Drizzle migrations
npm run push             # Apply migrations to local DB
npm run migrate          # Apply migrations to production
npm run db:reset         # Reset local Supabase database
npm run studio           # Open Supabase Studio at http://127.0.0.1:54323
```

### Deployment
```bash
npm run deploy           # Deploy to Cloudflare Workers
npm run preview          # Preview deployment locally
npm run cf-typegen       # Generate Cloudflare environment types
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19 with TypeScript 5
- **Database**: PostgreSQL with Drizzle ORM
- **Backend**: Supabase (auth + database)
- **API**: tRPC for type-safe APIs
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Deployment**: Cloudflare Workers via OpenNext

### Project Structure
- `src/app/` - Next.js App Router with route groups:
  - `(auth)/` - Authentication routes
  - `(home)/` - Main dashboard
  - `(landing)/` - Landing page
- `src/modules/` - Feature-based modules (auth, home)
- `src/components/` - Reusable UI components with shadcn/ui
- `src/lib/` - Supabase client, tRPC setup, utilities
- `src/db/` - Drizzle schema and database configuration

### Key Patterns
- **Module Structure**: Each feature module contains server logic, UI components, and views
- **Database Schema**: Comprehensive content aggregation system supporting multiple social platforms
- **Type Safety**: Full TypeScript with tRPC for end-to-end type safety
- **Authentication**: Supabase Auth with SSR support

## Development Setup

1. Start local Supabase: `supabase start`
2. Apply database schema: `npm run push`
3. Start development server: `npm run dev`
4. Access Supabase Studio: `npm run studio`

## Code Quality

The project uses Biome for linting and formatting (configured in `biome.json`). Git hooks via lefthook run quality checks on pre-commit and security audits on pre-push.

## Current Tasks (from TODO.md)

- Create mock category router
- Create mock bundle retrieval router  
- Implement custom hooks
- Mobile sidebar development

## Important Notes

- Always run `supabase start` before development
- Use `npm run check:fix` before committing
- Database changes require migration generation via `npm run generate`
- Deployment targets Cloudflare Workers - use `npm run cf-typegen` for environment types