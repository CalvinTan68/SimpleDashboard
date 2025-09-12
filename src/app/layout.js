import './globals.css'
import '../styles/index.scss'

export const metadata = {
  title: 'Simple Dashboard',
  description: 'A simple dashboard application built with Next.js and Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}