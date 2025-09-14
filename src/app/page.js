'use client'

import { Button, Typography, Space, Row, Col, Card, Divider } from 'antd'
import {
  DollarOutlined,
  BarChartOutlined,
  SafetyOutlined,
  MobileOutlined,
  TeamOutlined,
  RocketOutlined
} from '@ant-design/icons'
import Link from 'next/link'

const { Title, Paragraph, Text } = Typography

export default function HomePage() {
  const features = [
    {
      icon: <DollarOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Financial Management',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nulla sit amet aliquam lacinia.'
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Analytics & Reports',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Secure & Reliable',
      description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      icon: <MobileOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Mobile Responsive',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Team Collaboration',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.'
    },
    {
      icon: <RocketOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Fast Performance',
      description: 'Mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.'
    }
  ]

  const pricingPlans = [
    {
      title: 'Starter',
      price: '$9',
      period: '/month',
      features: [
        'Up to 100 transactions',
        '5 fund sources',
        'Basic reporting',
        'Email support'
      ],
      recommended: false
    },
    {
      title: 'Professional',
      price: '$19',
      period: '/month',
      features: [
        'Unlimited transactions',
        'Unlimited fund sources',
        'Advanced analytics',
        'Priority support',
        'Data export'
      ],
      recommended: true
    },
    {
      title: 'Enterprise',
      price: '$49',
      period: '/month',
      features: [
        'Everything in Professional',
        'Team collaboration',
        'Custom integrations',
        'Dedicated support',
        'Advanced security'
      ],
      recommended: false
    }
  ]

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={1} style={{ color: 'white', fontSize: '48px', marginBottom: '24px' }}>
            Simple Dashboard
          </Title>
          <Paragraph style={{ fontSize: '24px', marginBottom: '40px', color: 'rgba(255,255,255,0.9)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </Paragraph>
          <Space size="large">
            <Link href="/auth/register">
              <Button type="primary" size="large" style={{ height: '50px', fontSize: '16px', padding: '0 32px' }}>
                Get Started Free
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button ghost size="large" style={{ height: '50px', fontSize: '16px', padding: '0 32px' }}>
                Login
              </Button>
            </Link>
          </Space>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 20px', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Title level={2} style={{ fontSize: '36px', marginBottom: '16px' }}>
              Powerful Features
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nulla sit amet aliquam lacinia, nisl nisl aliquet nisl.
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card
                  style={{
                    height: '100%',
                    textAlign: 'center',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '20px'
                  }}
                >
                  <div style={{ marginBottom: '24px' }}>
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: '16px' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#666' }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Title level={2} style={{ fontSize: '36px', marginBottom: '16px' }}>
              Simple Pricing
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Choose the plan that works best for you.
            </Paragraph>
          </div>
          <Row gutter={[32, 32]} justify="center">
            {pricingPlans.map((plan, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  style={{
                    height: '100%',
                    textAlign: 'center',
                    border: plan.recommended ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    position: 'relative',
                    boxShadow: plan.recommended ? '0 8px 24px rgba(24,144,255,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {plan.recommended && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#1890ff',
                      color: 'white',
                      padding: '4px 16px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      RECOMMENDED
                    </div>
                  )}
                  <Title level={3} style={{ marginBottom: '8px' }}>
                    {plan.title}
                  </Title>
                  <div style={{ marginBottom: '24px' }}>
                    <Text style={{ fontSize: '48px', fontWeight: 'bold', color: '#1890ff' }}>
                      {plan.price}
                    </Text>
                    <Text style={{ fontSize: '16px', color: '#666' }}>
                      {plan.period}
                    </Text>
                  </div>
                  <div style={{ marginBottom: '32px' }}>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} style={{ marginBottom: '12px' }}>
                        <Text>{feature}</Text>
                      </div>
                    ))}
                  </div>
                  <Link href="/auth/register">
                    <Button
                      type={plan.recommended ? "primary" : "default"}
                      size="large"
                      block
                      style={{ height: '48px', fontSize: '16px' }}
                    >
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={2} style={{ color: 'white', fontSize: '36px', marginBottom: '16px' }}>
            Ready to Get Started?
          </Title>
          <Paragraph style={{ fontSize: '18px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Join thousands of users who trust our platform.
          </Paragraph>
          <Link href="/auth/register">
            <Button type="primary" size="large" style={{ height: '50px', fontSize: '16px', padding: '0 32px' }}>
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#001529',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Divider style={{ borderColor: '#434343', margin: '0 0 24px 0' }} />
          <Text style={{ color: '#8c8c8c' }}>
            © 2024 Simple Dashboard. Lorem ipsum dolor sit amet consectetur.
          </Text>
        </div>
      </footer>
    </div>
  )
}