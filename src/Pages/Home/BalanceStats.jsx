import { Column } from "@ant-design/charts";
import { Card } from "antd";
import { incomeExpenseStats } from "../../Data/accounts";

function BalanceStats() {
  const config = {
    data: incomeExpenseStats,
    xField: "Month",
    yField: "Value",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
    height: 200,
  };
  return (
    <>
      <Card title="Account Statistics">
        <Column {...config} />
      </Card>
    </>
  );
}

export default BalanceStats;
