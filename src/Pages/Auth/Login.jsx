import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_AUTH } from "../../constants";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post(API_AUTH + "/login", {
                email: values.email,
                password: values.password,
            });
            login(data.user, data.token);
            navigate("/");
        } catch (err) {
            console.error(
                err.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card>
                <div className="title-container">
                    <Title level={2} className="title">
                        Welcome Back
                    </Title>
                    <Text type="secondary">Sign in to your account</Text>
                </div>

                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email address!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <div className="footer-text">
                    <Text>Don't have an account? </Text>
                    <Link to="/register">Register now</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
