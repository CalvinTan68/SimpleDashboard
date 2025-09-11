import { ConfigProvider } from 'antd'
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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 6,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}