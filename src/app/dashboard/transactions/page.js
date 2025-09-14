'use client';

import React, { useState, useEffect } from "react";
import { Table, Button, Space, DatePicker, Select, message, Tag, Popconfirm, Pagination } from "antd";
import { DownloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader";
import CreateEditTransactionModal from "../../../components/CreateEditTransactionModal";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [filters, setFilters] = useState({
        dateRange: null,
        type: null,
        category: null
    });

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
            sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
            width: 120
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true
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
            filters: [
                { text: 'Income', value: 'income' },
                { text: 'Expense', value: 'expense' }
            ],
            onFilter: (value, record) => record.type === value,
            width: 100
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            ellipsis: true,
            width: 150
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount, record) => (
                <span style={{
                    color: record.type === 'income' ? '#3f8600' : '#cf1322',
                    fontWeight: 'bold'
                }}>
                    {record.type === 'income' ? '+' : '-'}${parseFloat(amount).toFixed(2)}
                </span>
            ),
            sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
            width: 120
        },
        {
            title: "Fund Source",
            dataIndex: ["fundSource", "name"],
            key: "fundSource",
            render: (name) => name || <span style={{ color: '#999' }}>N/A</span>,
            width: 150
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Delete Transaction"
                        description="Are you sure you want to delete this transaction?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
            width: 100,
            fixed: 'right'
        }
    ];

    useEffect(() => {
        fetchTransactions();
    }, [filters, pagination.current, pagination.pageSize]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (filters.type) {
                params.append('type', filters.type);
            }

            if (filters.category) {
                params.append('category', filters.category);
            }

            if (filters.dateRange && filters.dateRange.length === 2) {
                params.append('startDate', filters.dateRange[0].format('YYYY-MM-DD'));
                params.append('endDate', filters.dateRange[1].format('YYYY-MM-DD'));
            }

            params.append('page', pagination.current.toString());
            params.append('limit', pagination.pageSize.toString());

            const response = await fetch(`/api/transactions?${params}`);
            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();

            if (Array.isArray(data)) {
                // If the response is just an array, use it directly
                setTransactions(data);
                setPagination(prev => ({ ...prev, total: data.length }));
            } else {
                // If the response includes pagination info
                setTransactions(data.transactions || []);
                setPagination(prev => ({
                    ...prev,
                    total: data.total || 0,
                    current: data.page || 1
                }));
            }
        } catch (error) {
            message.error('Failed to fetch transactions');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (record) => {
        setEditingTransaction(record);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/transactions/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete');

            message.success('Transaction deleted successfully');
            fetchTransactions();
        } catch (error) {
            message.error('Failed to delete transaction');
            console.error(error);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setEditingTransaction(null);
    };

    const handleModalSuccess = () => {
        fetchTransactions();
        handleModalClose();
    };

    const handleExport = () => {
        const csvContent = [
            ['Date', 'Description', 'Type', 'Category', 'Amount', 'Fund Source'],
            ...transactions.map(t => [
                dayjs(t.date).format('YYYY-MM-DD'),
                `"${t.description.replace(/"/g, '""')}"`, // Escape quotes in CSV
                t.type,
                t.category || '',
                t.amount,
                t.fundSource?.name || 'N/A'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${dayjs().format('YYYY-MM-DD')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        message.success('Transactions exported successfully');
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(prev => ({
            ...prev,
            current: pagination.current,
            pageSize: pagination.pageSize
        }));
    };

    const resetFilters = () => {
        setFilters({
            dateRange: null,
            type: null,
            category: null
        });
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    return (
        <>
            <PageHeader
                divider
                title="Transactions"
                subtitle="View and manage your transactions"
                extra={[
                    <Button
                        key="export"
                        icon={<DownloadOutlined />}
                        onClick={handleExport}
                        disabled={transactions.length === 0}
                    >
                        Export
                    </Button>,
                    <Button
                        key="add"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModalVisible(true)}
                    >
                        Add Transaction
                    </Button>
                ]}
            />

            <Space style={{ marginBottom: 16 }} wrap>
                <RangePicker
                    value={filters.dateRange}
                    onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                    placeholder={['Start Date', 'End Date']}
                />
                <Select
                    style={{ width: 120 }}
                    placeholder="Type"
                    allowClear
                    value={filters.type}
                    onChange={(value) => setFilters({ ...filters, type: value })}
                >
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                </Select>
                <Select
                    style={{ width: 150 }}
                    placeholder="Category"
                    allowClear
                    value={filters.category}
                    onChange={(value) => setFilters({ ...filters, category: value })}
                >
                    <Select.Option value="Food & Dining">Food & Dining</Select.Option>
                    <Select.Option value="Transportation">Transportation</Select.Option>
                    <Select.Option value="Shopping">Shopping</Select.Option>
                    <Select.Option value="Entertainment">Entertainment</Select.Option>
                    <Select.Option value="Salary">Salary</Select.Option>
                    <Select.Option value="Freelance">Freelance</Select.Option>
                    <Select.Option value="Investment">Investment</Select.Option>
                </Select>
                <Button onClick={resetFilters}>Reset Filters</Button>
            </Space>

            <Table
                columns={columns}
                dataSource={transactions}
                loading={loading}
                rowKey="id"
                pagination={{
                    ...pagination,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
                    pageSizeOptions: ['10', '20', '50', '100']
                }}
                onChange={handleTableChange}
                scroll={{ x: true }}
                size="small"
            />

            <CreateEditTransactionModal
                visible={modalVisible}
                onCancel={handleModalClose}
                onSuccess={handleModalSuccess}
                editingTransaction={editingTransaction}
            />
        </>
    );
}

export default Transactions;