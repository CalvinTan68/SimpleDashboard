import { Button, Typography, Space } from 'antd'
import Link from 'next/link'

const { Title, Paragraph } = Typography

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <Title level={1}>Simple Dashboard</Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '30px' }}>
          Manage your finances with our simple and intuitive dashboard
        </Paragraph>
        <Space size="large">
          <Link href="/auth/login">
            <Button type="primary" size="large">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="large">
              Register
            </Button>
          </Link>
        </Space>
      </div>
    </div>
  )
}