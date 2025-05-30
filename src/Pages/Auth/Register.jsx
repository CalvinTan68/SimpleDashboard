import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_AUTH, API_PUBLIC_COUNTRIES } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
    const [form] = Form.useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { data: countries, isLoading: isLoadingCountries } =
        useFetch(API_PUBLIC_COUNTRIES);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post(API_AUTH + "/register", {
                name: values.name,
                email: values.email,
                password: values.password,
                countryId: values.countryId,
            });
            login(data.user, data.token);
            navigate("/");
        } catch (err) {
            console.error(
                err.response?.data?.message ||
                    "Registration failed. Please try again."
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
                        Create Account
                    </Title>
                    <Text type="secondary">Sign up for a new account</Text>
                </div>

                <Form
                    form={form}
                    name="register"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Full Name"
                            size="large"
                        />
                    </Form.Item>

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
                            prefix={<MailOutlined />}
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
                            {
                                min: 6,
                                message:
                                    "Password must be at least 6 characters!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item name="countryId">
                        <Select
                            size="large"
                            placeholder="Select Country"
                            loading={isLoadingCountries}
                            showSearch
                            filterOption={(input, option) =>
                                option?.name
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase()) ||
                                option?.currencyCode
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {countries?.countries?.map((country) => (
                                <Option
                                    key={country.id}
                                    value={country.id}
                                    name={country.name}
                                    currencyCode={country.currencyCode}
                                >
                                    {`${country.name} (${country.currencyCode})`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>

                <div className="footer-text">
                    <Text>Already have an account? </Text>
                    <Link to="/login">Sign in</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
