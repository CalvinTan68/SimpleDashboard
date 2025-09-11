# Next.js + Supabase Setup Guide

## Project Structure
```
├── app/                        # Next.js App Router
│   ├── auth/                  # Authentication pages
│   │   ├── login/            # Login page
│   │   └── register/         # Register page
│   ├── dashboard/            # Protected dashboard area
│   │   ├── fund-source/      # Fund sources management
│   │   ├── transactions/     # Transactions management
│   │   ├── layout.js         # Dashboard layout with sidebar
│   │   └── page.js          # Dashboard home
│   ├── layout.js            # Root layout with Ant Design
│   └── page.js              # Public home page
├── components/               # Reusable components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
│   ├── api-client.js       # API client with auth headers
│   └── supabase/           # Supabase configuration
├── styles/                  # SCSS styles
└── middleware.js            # Next.js middleware for auth
```

## Setup Instructions

### 1. Install Dependencies
```bash
yarn install
```

### 2. Configure Environment Variables
Your `.env.local` file is already configured with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

### 3. Setup Supabase Database
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL from `supabase-schema.sql` file
4. This will create:
   - `fund_sources` table
   - `transactions` table
   - Row Level Security policies
   - Automatic timestamps

### 4. Run Development Server
```bash
yarn dev
```

## Features Implemented

### Authentication
- ✅ Supabase Auth integration (using auth.users table)
- ✅ JWT-based authentication
- ✅ Login/Register pages
- ✅ Protected routes with middleware
- ✅ Session persistence
- ✅ Authorization header and x-user-id in all API requests

### UI/UX
- ✅ Ant Design components
- ✅ Same layout as original (Sider + Content)
- ✅ Dark mode support (toggle button in sidebar)
- ✅ Responsive design
- ✅ Simple code style (no useMemo/useCallback)

### Pages
- ✅ Public home page
- ✅ Login/Register pages
- ✅ Dashboard with statistics
- ✅ Fund Sources management (CRUD)
- ✅ Transactions list with filters

### API Client
The `lib/api-client.js` automatically adds:
- `Authorization: Bearer <token>` header
- `x-user-id: <user-id>` header
- Content-Type headers

Usage:
```javascript
import apiClient from '@/lib/api-client';

// GET request
const data = await apiClient.get('/api/endpoint');

// POST request
const result = await apiClient.post('/api/endpoint', { data });
```

## Database Schema

### fund_sources
- `id` (UUID, primary key)
- `user_id` (UUID, references auth.users)
- `name` (text)
- `type` (text: bank/cash/credit/investment/other)
- `balance` (decimal)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### transactions
- `id` (UUID, primary key)
- `user_id` (UUID, references auth.users)
- `fund_source_id` (UUID, references fund_sources)
- `date` (date)
- `description` (text)
- `type` (text: income/expense)
- `category` (text)
- `amount` (decimal)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Row Level Security
All tables have RLS enabled, ensuring users can only:
- View their own data
- Create records linked to their user_id
- Update their own records
- Delete their own records

## Testing the Application
1. Navigate to http://localhost:3000
2. Click "Register" to create a new account
3. Login with your credentials
4. You'll be redirected to the dashboard
5. Test fund sources and transactions features

## Notes
- The application uses Supabase's built-in auth system
- No custom user tables needed - everything uses auth.users
- All data is automatically filtered by user_id
- Dark mode preference is saved in localStorage
- Simple, straightforward code style maintained throughout