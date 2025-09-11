'use client';

import { LogoutOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import React from "react";
import useAuth from "../hooks/useAuth";

const LogoutButton = () => {
    const { signOut } = useAuth();

    const handleLogout = async () => {
        try {
            const { error } = await signOut();
            if (error) {
                message.error("Error logging out");
            } else {
                message.success("Logged out successfully");
            }
        } catch (err) {
            message.error("Error logging out");
            console.error(err);
        }
    };

    return (
        <Popconfirm
            title="Logout"
            description="Are you sure you want to logout?"
            onConfirm={handleLogout}
            okText="Yes"
            cancelText="No"
        >
            <Button
                type="primary"
                icon={<LogoutOutlined />}
                danger
                size="large"
                shape="circle"
            />
        </Popconfirm>
    );
};

export default LogoutButton;