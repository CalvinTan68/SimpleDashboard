import { LogoutOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
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
