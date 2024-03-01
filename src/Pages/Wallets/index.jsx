import { List, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import PageHeader from "../../Components/PageHeader";
import { ownedCards } from "../../Data/wallets";

function Wallets() {
  return (
    <>
      <PageHeader divider title="Wallets" />

      <List
        pagination={false}
        itemLayout="horizontal"
        dataSource={ownedCards}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.cardLabel}
              description={
                <Typography.Paragraph copyable>
                  {item.cardNumber}
                </Typography.Paragraph>
              }
            />
            <span>Exp: {dayjs(item.cardExp).format("MM/YY")}</span>
          </List.Item>
        )}
      />
    </>
  );
}

export default Wallets;
