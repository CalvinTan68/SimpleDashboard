# Simple Dashboard - Next.js Migration

This project has been migrated from React (Vite) to Next.js with Supabase integration.

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── auth/
│   │   ├── login/page.js        # Login page
│   │   └── register/page.js     # Register page
│   ├── dashboard/
│   │   ├── layout.js            # Dashboard layout with sidebar
│   │   └── page.js              # Dashboard home
│   ├── fund-source/page.js      # Fund sources management
│   ├── transactions/page.js     # Transactions list
│   ├── layout.js                # Root layout
│   ├── page.js                  # Home page (redirects to dashboard or login)
│   └── globals.css              # Global styles
├── components/                  # Reusable components
│   ├── LogoutButton.js
│   ├── PageHeader.js
│   ├── ProtectedRoute.js
│   └── Sidebar.js
├── hooks/                       # Custom hooks
│   ├── useAuth.js              # Authentication hook
│   └── useSupabase.js          # Supabase client hook
├── lib/                        # Library code
│   ├── constants.js            # App constants
│   └── supabase/              # Supabase configuration
│       ├── client.js          # Client-side Supabase
│       ├── middleware.js      # Middleware helper
│       └── server.js          # Server-side Supabase
├── styles/                     # SCSS styles (copied from original)
│   ├── _authscreen.scss
│   ├── _globals.scss
│   ├── _popup.scss
│   ├── _sidebar.scss
│   ├── _variables.scss
│   └── index.scss
├── middleware.js               # Next.js middleware
├── next.config.js             # Next.js configuration
└── .env.local.example         # Environment variables template
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Environment Setup**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     ```

3. **Database Setup** (if using Supabase)
   - Create tables in your Supabase database:
     - `fund_sources`
     - `transactions` 
     - `users` (managed by Supabase Auth)

4. **Run Development Server**
   ```bash
   yarn dev
   ```

## Key Features

- **Authentication**: Integrated with Supabase Auth
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Dashboard**: Overview with charts and statistics
- **Fund Sources**: Manage different payment methods/accounts
- **Transactions**: View and filter transaction history
- **Responsive Design**: Works on desktop and mobile

## Migration Changes

### From React (Vite) to Next.js:
- Converted to Next.js App Router structure
- Updated routing from React Router to Next.js routing
- Added server-side rendering capabilities
- Integrated Supabase for authentication and data

### Authentication:
- Replaced custom auth context with Supabase Auth
- Updated login/register flows
- Added middleware for session management

### Styling:
- Kept original SCSS styles
- Added Next.js CSS configuration
- Maintained Ant Design components

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **UI**: Ant Design
- **Styling**: SCSS
- **Charts**: @ant-design/charts
- **Icons**: @ant-design/icons, react-icons
- **Date**: dayjs

## Future Enhancements

- [ ] Implement CRUD operations for fund sources
- [ ] Add transaction creation/editing
- [ ] Integrate with Supabase database
- [ ] Add real-time updates
- [ ] Implement data export functionality
- [ ] Add user profile management
- [ ] Mobile responsiveness improvements