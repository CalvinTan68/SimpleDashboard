import { Col, Row } from "antd";
import React from "react";
import PageHeader from "../../Components/PageHeader";
import PremiumPopup from "../../Components/PremiumPopup";
import AccountHealth from "./AccountHealth";
import BalanceStats from "./BalanceStats";
import ExpenseIncomePercentages from "./ExpenseIncomePercentages";
import RecentTransactions from "./RecentTransactions";
import ShoppingLists from "./ShoppingLists";

function Home() {
  const cards = [
    { key: 1, content: <BalanceStats /> },
    { key: 2, content: <ExpenseIncomePercentages /> },
    { key: 3, content: <RecentTransactions /> },
    { key: 4, content: <ShoppingLists /> },
    { key: 5, content: <AccountHealth /> },
  ];

  return (
    <>
      <PageHeader
        divider
        title="Hello, Calvin"
        subtitle="View and control your finances here!"
      />

      <Row gutter={[16, 16]}>
        {cards.map((card) => (
          <Col xs={24} md={12} lg={8} key={card.key}>
            {card.content}
          </Col>
        ))}
      </Row>

      <PremiumPopup />
    </>
  );
}

export default Home;
