import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Typography } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

import { Tooltip } from "antd";
import { pageList } from "../Data/pageList";

import { PiChats } from "react-icons/pi";
import { logoutSuccessMessage } from "../Functions/Messages";
import { comingSoon } from "../Functions/Modals";

const { Sider } = Layout;

function Sidebar() {
  const location = useLocation();

  return (
    <>
      <Sider collapsed className="sidebar">
        <div className="first-item">
          <Typography.Title>S.</Typography.Title>
          <Tooltip placement="right" title="Chat Support">
            <Button
              icon={<PiChats />}
              shape="circle"
              size="large"
              onClick={comingSoon}
            />
          </Tooltip>
        </div>
        <div className="second-item">
          <Menu
            theme="light"
            mode="inline"
            items={pageList}
            defaultSelectedKeys={[location.pathname]}
          />
        </div>
        <div className="third-item">
          <Avatar size={50} icon={<UserOutlined />} />
          <Tooltip placement="right" title="Logout">
            <Button
              icon={<LogoutOutlined />}
              shape="circle"
              size="large"
              onClick={logoutSuccessMessage}
            />
          </Tooltip>
        </div>
      </Sider>
    </>
  );
}

export default Sidebar;
