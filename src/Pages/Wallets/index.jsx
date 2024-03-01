import { Table, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import PageHeader from "../../Components/PageHeader";
import { ownedCards } from "../../Data/wallets";

function Wallets() {
  const ownedCardsTableColumns = [
    {
      key: "cardLabel",
      title: "Card Label",
      dataIndex: "cardLabel",
    },
    {
      key: "cardNumber",
      title: "Card Number",
      dataIndex: "cardNumber",
      render: (cardNumber) => {
        const spacedCardNumber = cardNumber
          .replace(/\s/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        return (
          <Typography.Paragraph copyable>
            {spacedCardNumber}
          </Typography.Paragraph>
        );
      },
    },
    {
      key: "cardExp",
      title: "Expired Date",
      dataIndex: "cardExp",
      render: (cardExp) => {
        return dayjs(cardExp).format("MM/YY");
      },
    },
  ];
  return (
    <>
      <PageHeader divider title="Wallets" />

      <Table
        rowKey="id"
        dataSource={ownedCards}
        columns={ownedCardsTableColumns}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
      />
    </>
  );
}

export default Wallets;
