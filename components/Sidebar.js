'use client';

import { HomeOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, Typography, Space } from "antd";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMoneyWithdraw } from "react-icons/bi";
import LogoutButton from "./LogoutButton";

const { Sider } = Layout;

function Sidebar() {
    const pathname = usePathname();
    
    const pageList = [
        {
            key: "/dashboard",
            icon: <HomeOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
        },
        {
            key: "/dashboard/fund-source",
            icon: <WalletOutlined />,
            label: <Link href="/dashboard/fund-source">Fund Source</Link>,
        },
        {
            key: "/dashboard/transactions",
            icon: <BiMoneyWithdraw />,
            label: <Link href="/dashboard/transactions">Transactions</Link>,
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
                        selectedKeys={[pathname]}
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