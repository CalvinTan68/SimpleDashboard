'use client';

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, message } from "antd";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth";

const { Title, Text } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const { user, signIn } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const { data, error } = await signIn(values.email, values.password);
            
            if (error) {
                message.error(error.message || "Login failed. Please try again.");
            } else {
                message.success("Login successful!");
                router.push('/dashboard');
            }
        } catch (err) {
            message.error("Login failed. Please try again.");
            console.error(err);
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
                    <Link href="/auth/register">Register now</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;