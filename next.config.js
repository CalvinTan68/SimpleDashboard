/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr']
  },
  sassOptions: {
    includePaths: ['./src/styles']
  }
}

module.exports = nextConfig