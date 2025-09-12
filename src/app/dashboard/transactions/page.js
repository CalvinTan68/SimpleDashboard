'use client';

import React, { useState, useEffect } from "react";
import { Table, Button, Space, DatePicker, Select, message, Tag } from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        dateRange: null,
        type: null,
    });

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => (
                <Tag color={type === 'income' ? 'green' : 'red'}>
                    {type?.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount, record) => (
                <span style={{ color: record.type === 'income' ? 'green' : 'red' }}>
                    {record.type === 'income' ? '+' : '-'}${parseFloat(amount).toFixed(2)}
                </span>
            ),
        },
        {
            title: "Fund Source",
            dataIndex: ["fundSource", "name"],
            key: "fundSource",
            render: (name) => name || 'N/A'
        },
    ];

    useEffect(() => {
        fetchTransactions();
    }, [filters]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            
            if (filters.type) {
                params.append('type', filters.type);
            }
            
            if (filters.dateRange && filters.dateRange.length === 2) {
                params.append('startDate', filters.dateRange[0].format('YYYY-MM-DD'));
                params.append('endDate', filters.dateRange[1].format('YYYY-MM-DD'));
            }

            const response = await fetch(`/api/transactions?${params}`);
            if (!response.ok) throw new Error('Failed to fetch');
            
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            message.error('Failed to fetch transactions');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        const csvContent = [
            ['Date', 'Description', 'Type', 'Category', 'Amount', 'Fund Source'],
            ...transactions.map(t => [
                dayjs(t.date).format('YYYY-MM-DD'),
                t.description,
                t.type,
                t.category || '',
                t.amount,
                t.fundSource?.name || 'N/A'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${dayjs().format('YYYY-MM-DD')}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        message.success('Transactions exported successfully');
    };

    return (
        <>
            <PageHeader
                divider
                title="Transactions"
                subtitle="View and manage your transactions"
                extra={[
                    <Button
                        key="add"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => message.info('Add transaction feature coming soon')}
                    >
                        Add Transaction
                    </Button>
                ]}
            />
            <Space style={{ marginBottom: 16 }}>
                <RangePicker
                    onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                    placeholder={['Start Date', 'End Date']}
                />
                <Select
                    style={{ width: 120 }}
                    placeholder="Type"
                    allowClear
                    onChange={(value) => setFilters({ ...filters, type: value })}
                >
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                </Select>
                <Button
                    icon={<DownloadOutlined />}
                    onClick={handleExport}
                >
                    Export
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={transactions}
                loading={loading}
                rowKey="id"
            />
        </>
    );
}

export default Transactions;