import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Card, Progress, Space, Typography } from "antd";
import React from "react";
import { healthGuide } from "../../Functions/Modals";

function AccountHealth() {
  const percentage = 97;

  let health;

  switch (true) {
    case percentage >= 0 && percentage <= 50:
      health = "Danger";
      break;
    case percentage >= 51 && percentage <= 80:
      health = "Good";
      break;
    case percentage >= 81 && percentage <= 100:
      health = "Healthy";
      break;
    default:
      health = "Unknown";
  }

  return (
    <>
      <Card title="Account Health">
        <Space size="large">
          <Progress type="circle" percent={percentage} />
          <Space>
            <Typography.Text>Your account is {health}</Typography.Text>
            <Button
              size="small"
              icon={<InfoCircleFilled />}
              shape="circle"
              onClick={healthGuide}
            />
          </Space>
        </Space>
      </Card>
    </>
  );
}

export default AccountHealth;
