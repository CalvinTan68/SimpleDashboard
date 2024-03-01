import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import PageHeader from "../../Components/PageHeader";
import { notifications } from "../../Data/notifications";

function Notifications() {
  const notificationTableColumns = [
    {
      key: "notification",
      title: "Notification",
      dataIndex: "notification",
      width: "50%",
    },
    {
      key: "createdAt",
      title: "Timestamp",
      dataIndex: "createdAt",
      width: "50%",
      render: (createdAt) => {
        return dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ];
  return (
    <>
      <PageHeader divider title="Notifications" />

      <Table
        rowKey="id"
        dataSource={notifications}
        columns={notificationTableColumns}
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
      />
    </>
  );
}

export default Notifications;
