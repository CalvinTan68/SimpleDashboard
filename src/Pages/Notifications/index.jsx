import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import dayjs from "dayjs";
import React from "react";
import PageHeader from "../../Components/PageHeader";
import { notifications } from "../../Data/notifications";

function Notifications() {
  return (
    <>
      <PageHeader divider title="Notifications" />
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button shape="circle" icon={<EyeOutlined />} />,
              <Button shape="circle" icon={<DeleteOutlined />} danger />,
            ]}
          >
            <List.Item.Meta
              title={item.notification}
              description={dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default Notifications;
