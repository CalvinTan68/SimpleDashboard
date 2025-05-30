import { HomeOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, Typography } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Space } from "antd";
import { BiMoneyWithdraw } from "react-icons/bi";
import LogoutButton from "./LogoutButton";

const { Sider } = Layout;

function Sidebar() {
    const location = useLocation();
    const pageList = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: <Link to="/">Dashboard</Link>,
        },
        {
            key: "/fund-source",
            icon: <WalletOutlined />,
            label: <Link to="/fund-source">Fund Source</Link>,
        },
        {
            key: "/transactions",
            icon: <BiMoneyWithdraw />,
            label: <Link to="/transactions">Transactions</Link>,
        },
    ];

    return (
        <>
            <Sider collapsed={true} className="sidebar">
                <div className="first-item">
                    <Space direction="vertical">
                        <Typography.Title>S.</Typography.Title>
                    </Space>
                </div>
                <div className="second-item">
                    <Menu
                        theme="light"
                        mode="inline"
                        items={pageList}
                        selectedKeys={[location.pathname]}
                    />
                </div>
                <div className="third-item">
                    <Space direction="vertical">
                        <Avatar size={45} icon={<UserOutlined />} />
                        <LogoutButton />
                    </Space>
                </div>
            </Sider>
        </>
    );
}

export default Sidebar;
