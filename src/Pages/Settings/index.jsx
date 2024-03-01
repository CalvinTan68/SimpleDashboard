import { Col, Row } from "antd";
import React from "react";
import PageHeader from "../../Components/PageHeader";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function Settings() {
  const cards = [
    { key: 1, content: <ChangePassword /> },
    { key: 2, content: <DeleteAccount /> },
  ];
  return (
    <>
      <PageHeader divider title="Settings" />

      <Row gutter={[16, 16]}>
        {cards.map((card) => (
          <Col xs={24} lg={12} key={card.key}>
            {card.content}
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Settings;
