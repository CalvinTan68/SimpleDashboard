import { Tiny } from "@ant-design/charts";
import { Card, Divider, Flex, Space, Typography } from "antd";
import React from "react";

function ExpenseIncomePercentages() {
  const progress = 0.75;

  const config = {
    height: 60,
    autoFit: true,
    percent: progress,
    color: ["#ffc068", "#7b43ff"],
    annotations: [
      {
        type: "text",
        style: {
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
        },
      },
    ],
  };
  return (
    <>
      <Card title="Account Percentages">
        <Flex align="center" justify="space-between">
          <Space direction="vertical" style={{ textAlign: "left" }}>
            <Typography.Title level={5}>Expense</Typography.Title>
            <Typography.Title level={4}>75%</Typography.Title>
            <Typography.Text>$750</Typography.Text>
          </Space>

          <Divider type="vertical" />

          <Space direction="vertical" style={{ textAlign: "right" }}>
            <Typography.Title level={5}>Income</Typography.Title>
            <Typography.Title level={4}>25%</Typography.Title>
            <Typography.Text>$250</Typography.Text>
          </Space>
        </Flex>

        <Tiny.Progress {...config} />
      </Card>
    </>
  );
}

export default ExpenseIncomePercentages;
