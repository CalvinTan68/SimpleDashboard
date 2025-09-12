'use client';

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";

function Dashboard() {
    const { user } = useAuth();
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        if (user) {
            setUserName(user.email?.split('@')[0] || "User");
        }
    }, [user]);

    return (
        <>
            <PageHeader
                divider
                title={`Hello ${userName}`}
                subtitle="View and control your finances here!"
            />
            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Balance"
                            value={11893}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix="$"
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Monthly Income"
                            value={9300}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix="$"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Monthly Expenses"
                            value={4250}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix="$"
                            suffix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;