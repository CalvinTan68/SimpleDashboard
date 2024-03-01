import { Card, Checkbox, Col, Row } from "antd";
import React from "react";
import { shoppingList } from "../../Data/shoppingList";

function ShoppingLists() {
  return (
    <>
      <Card title="Shopping List">
        <Row gutter={[8, 8]}>
          {shoppingList.map((item) => (
            <Col span={12}>
              <Checkbox checked={item.bought}>{item.item}</Checkbox>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default ShoppingLists;
