'use client';

import { Typography, Divider } from "antd";

const { Title, Text } = Typography;

export default function PageHeader({ title, subtitle, divider = false }) {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ margin: 0 }}>{title}</Title>
      {subtitle && (
        <Text type="secondary" style={{ fontSize: '16px' }}>
          {subtitle}
        </Text>
      )}
      {divider && <Divider />}
    </div>
  );
}