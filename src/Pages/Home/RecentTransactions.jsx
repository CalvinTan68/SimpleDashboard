import { Card, List } from "antd";
import dayjs from "dayjs";
import React from "react";
import { recentTransactions } from "../../Data/accounts";

function RecentTransactions() {
  return (
    <>
      <Card title="Recent Transactions">
        <List
          pagination={false}
          itemLayout="horizontal"
          dataSource={recentTransactions}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.name}
                description={dayjs(item.createdAt).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              />
              {item.debit !== 0 && item.debit !== null ? (
                <span className="debit">${item.debit}</span>
              ) : (
                <span className="credit">${item.credit}</span>
              )}
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}

export default RecentTransactions;
