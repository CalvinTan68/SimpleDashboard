export const API_URL = process.env.NEXT_PUBLIC_APP_URL;

// Supabase tables
export const TABLES = {
  FUND_SOURCES: 'fund_sources',
  TRANSACTIONS: 'transactions',
  USERS: 'users'
};

// Auth routes
export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register'
};

// Protected routes
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  FUND_SOURCES: '/fund-source',
  TRANSACTIONS: '/transactions'
};