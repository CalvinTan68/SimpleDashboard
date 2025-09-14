# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: This project uses Yarn (specified in package.json)

```bash
# Install dependencies
yarn install

# Development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Linting
yarn lint

# Database operations
yarn seed                 # Seed database with initial data
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run database migrations
```

## Architecture Overview

This is a Next.js 14 application using the App Router pattern with Supabase for authentication and database operations.

### Core Technology Stack
- **Framework**: Next.js 14 with App Router
- **UI Library**: Ant Design (antd) with Ant Design Charts
- **Authentication**: Supabase Auth (JWT-based)
- **Database**: PostgreSQL via Supabase with Prisma ORM
- **Styling**: SCSS with Ant Design components
- **Package Manager**: Yarn

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages (login/register)
│   ├── dashboard/         # Protected dashboard area
│   │   ├── fund-source/   # Fund sources management
│   │   ├── transactions/  # Transactions management
│   │   └── layout.js      # Dashboard layout with sidebar
│   ├── layout.js          # Root layout with Ant Design
│   └── page.js            # Public home page
├── components/            # Reusable React components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── api-client.js     # Authenticated API client
│   └── supabase/         # Supabase configuration
├── styles/               # SCSS stylesheets
└── middleware.js         # Next.js middleware for auth
```

### Authentication System
- Uses Supabase Auth with JWT tokens
- Session-based authentication with automatic token refresh
- Protected routes enforced via Next.js middleware
- Row Level Security (RLS) enabled on all database tables
- Custom API client automatically includes auth headers

### Database Schema
**Core Models**:
- `fund_sources`: User's financial accounts (bank, cash, credit, investment, other)
- `transactions`: Income/expense records linked to fund sources
- Both tables include automatic `user_id` filtering via RLS

**Key Features**:
- All data is automatically scoped to the authenticated user
- Prisma ORM for type-safe database operations
- Automatic timestamps (created_at, updated_at)

### API Client Usage
The custom `lib/api-client.js` automatically handles:
- Authorization headers (`Bearer <token>`)
- User ID headers (`x-user-id`)
- Content-Type headers
- Error handling

```javascript
import apiClient from '@/lib/api-client';

const data = await apiClient.get('/api/endpoint');
const result = await apiClient.post('/api/endpoint', payload);
```

### UI/UX Patterns
- Dark mode support with localStorage persistence
- Responsive design using Ant Design's grid system
- Simple, straightforward code style (avoids useMemo/useCallback)
- Consistent sidebar navigation layout
- Modal-based forms for CRUD operations

### Environment Setup
Requires `.env.local` with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL` (for Prisma)

## Development Notes

- This project was migrated from a React-Vite application to Next.js
- Maintains simple code patterns for maintainability
- All database operations are user-scoped through RLS
- Uses Supabase's built-in user management (no custom user tables)
- Financial data includes fund sources and transaction management