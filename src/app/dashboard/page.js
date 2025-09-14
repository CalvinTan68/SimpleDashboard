'use client';

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Card, Col, Row, Statistic, Table, Typography, Spin, Empty } from "antd";
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    DollarOutlined,
    WalletOutlined,
    TransactionOutlined,
    BankOutlined
} from "@ant-design/icons";
import { Column } from '@ant-design/charts';
import useAuth from "../../hooks/useAuth";
import dayjs from 'dayjs';

const { Title, Text } = Typography;

function Dashboard() {
    const { user } = useAuth();
    const [userName, setUserName] = useState("User");
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setUserName(user.email?.split('@')[0] || "User");
            fetchDashboardStats();
        }
    }, [user]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/dashboard/stats');
            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const recentTransactionsColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => dayjs(date).format('MMM DD'),
            width: 80
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount, record) => (
                <span style={{
                    color: record.type === 'income' ? '#3f8600' : '#cf1322',
                    fontWeight: 'bold'
                }}>
                    {record.type === 'income' ? '+' : '-'}${parseFloat(amount).toFixed(2)}
                </span>
            ),
            width: 100
        }
    ];

    const chartConfig = {
        data: stats?.monthlyChart || [],
        xField: 'month',
        yField: 'value',
        seriesField: 'type',
        height: 300,
        columnStyle: {
            radius: [4, 4, 0, 0]
        },
        color: ['#3f8600', '#cf1322']
    };

    // Transform data for chart
    const chartData = stats?.monthlyChart?.flatMap(item => [
        { month: item.month, value: item.income, type: 'Income' },
        { month: item.month, value: item.expenses, type: 'Expenses' }
    ]) || [];

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
            }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <PageHeader
                divider
                title={`Hello ${userName}`}
                subtitle="View and control your finances here!"
            />

            {/* Statistics Cards */}
            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Balance"
                            value={stats?.totalBalance || 0}
                            precision={2}
                            valueStyle={{
                                color: (stats?.totalBalance || 0) >= 0 ? '#3f8600' : '#cf1322'
                            }}
                            prefix={<DollarOutlined />}
                            suffix={
                                (stats?.totalBalance || 0) >= 0
                                    ? <ArrowUpOutlined />
                                    : <ArrowDownOutlined />
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Monthly Income"
                            value={stats?.monthlyIncome || 0}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Monthly Expenses"
                            value={stats?.monthlyExpenses || 0}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Fund Sources"
                            value={stats?.fundSourcesCount || 0}
                            valueStyle={{ color: '#1890ff' }}
                            prefix={<BankOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts and Recent Transactions */}
            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col xs={24} lg={16}>
                    <Card title="Income vs Expenses (Last 6 Months)">
                        {chartData.length > 0 ? (
                            <Column {...chartConfig} data={chartData} />
                        ) : (
                            <Empty
                                description="No transaction data available"
                                style={{ padding: '60px 0' }}
                            />
                        )}
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card
                        title="Recent Transactions"
                        extra={
                            <Text type="secondary">
                                {stats?.totalTransactions || 0} total
                            </Text>
                        }
                    >
                        {stats?.recentTransactions?.length > 0 ? (
                            <Table
                                columns={recentTransactionsColumns}
                                dataSource={stats.recentTransactions}
                                pagination={false}
                                rowKey="id"
                                size="small"
                                showHeader={false}
                                style={{ maxHeight: 300, overflow: 'auto' }}
                            />
                        ) : (
                            <Empty
                                description="No recent transactions"
                                style={{ padding: '40px 0' }}
                            />
                        )}
                    </Card>
                </Col>
            </Row>

            {/* Summary Cards */}
            <Row gutter={16} style={{ marginTop: 24, marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={8}>
                    <Card style={{ textAlign: 'center' }}>
                        <TransactionOutlined
                            style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }}
                        />
                        <Title level={4} style={{ margin: 0 }}>
                            {stats?.totalTransactions || 0}
                        </Title>
                        <Text type="secondary">Total Transactions</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card style={{ textAlign: 'center' }}>
                        <ArrowUpOutlined
                            style={{ fontSize: '32px', color: '#3f8600', marginBottom: '16px' }}
                        />
                        <Title level={4} style={{ margin: 0, color: '#3f8600' }}>
                            ${(stats?.yearlyIncome || 0).toFixed(2)}
                        </Title>
                        <Text type="secondary">Yearly Income</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card style={{ textAlign: 'center' }}>
                        <ArrowDownOutlined
                            style={{ fontSize: '32px', color: '#cf1322', marginBottom: '16px' }}
                        />
                        <Title level={4} style={{ margin: 0, color: '#cf1322' }}>
                            ${(stats?.yearlyExpenses || 0).toFixed(2)}
                        </Title>
                        <Text type="secondary">Yearly Expenses</Text>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;