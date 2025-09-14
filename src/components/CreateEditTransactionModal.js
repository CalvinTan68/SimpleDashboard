'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, InputNumber, message } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const CreateEditTransactionModal = ({ visible, onCancel, onSuccess, editingTransaction }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fundSources, setFundSources] = useState([]);

    useEffect(() => {
        if (visible) {
            fetchFundSources();
        }

        if (editingTransaction) {
            form.setFieldsValue({
                ...editingTransaction,
                date: editingTransaction.date ? dayjs(editingTransaction.date) : null,
                amount: parseFloat(editingTransaction.amount),
                fundSourceId: editingTransaction.fundSourceId || undefined
            });
        } else {
            form.resetFields();
            // Set default date to today
            form.setFieldsValue({
                date: dayjs()
            });
        }
    }, [editingTransaction, form, visible]);

    const fetchFundSources = async () => {
        try {
            const response = await fetch('/api/fund-sources');
            if (!response.ok) throw new Error('Failed to fetch fund sources');
            const data = await response.json();
            setFundSources(data);
        } catch (error) {
            console.error('Error fetching fund sources:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const formattedValues = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
                amount: values.amount.toString()
            };

            const url = editingTransaction
                ? `/api/transactions/${editingTransaction.id}`
                : '/api/transactions';

            const method = editingTransaction ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedValues),
            });

            if (!response.ok) {
                throw new Error('Failed to save transaction');
            }

            message.success(
                editingTransaction
                    ? 'Transaction updated successfully'
                    : 'Transaction created successfully'
            );

            form.resetFields();
            onSuccess();
        } catch (error) {
            message.error('Failed to save transaction');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const categories = {
        income: ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other Income'],
        expense: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities',
                 'Healthcare', 'Education', 'Travel', 'Personal Care', 'Other Expense']
    };

    const [transactionType, setTransactionType] = useState(editingTransaction?.type || 'expense');

    return (
        <Modal
            title={editingTransaction ? 'Edit Transaction' : 'Create Transaction'}
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
            confirmLoading={loading}
            destroyOnClose
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                name="transaction_form"
            >
                <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true, message: 'Please select a date!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        { required: true, message: 'Please input a description!' },
                        { max: 500, message: 'Description cannot exceed 500 characters' }
                    ]}
                >
                    <TextArea
                        rows={2}
                        placeholder="e.g., Grocery shopping at Walmart"
                    />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please select a type!' }]}
                >
                    <Select
                        placeholder="Select transaction type"
                        onChange={(value) => {
                            setTransactionType(value);
                            form.setFieldsValue({ category: undefined });
                        }}
                    >
                        <Option value="income">Income</Option>
                        <Option value="expense">Expense</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Category"
                    dependencies={['type']}
                >
                    <Select placeholder="Select a category" allowClear>
                        {categories[transactionType]?.map(cat => (
                            <Option key={cat} value={cat}>{cat}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                        { required: true, message: 'Please input an amount!' },
                        { type: 'number', min: 0.01, message: 'Amount must be greater than 0' }
                    ]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        precision={2}
                        placeholder="0.00"
                    />
                </Form.Item>

                <Form.Item
                    name="fundSourceId"
                    label="Fund Source"
                >
                    <Select placeholder="Select a fund source (optional)" allowClear>
                        {fundSources.map(source => (
                            <Option key={source.id} value={source.id}>
                                {source.name} ({source.type})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditTransactionModal;