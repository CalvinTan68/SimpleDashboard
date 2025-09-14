'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const CreateEditFundSourceModal = ({ visible, onCancel, onSuccess, editingSource }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (editingSource) {
            form.setFieldsValue(editingSource);
        } else {
            form.resetFields();
        }
    }, [editingSource, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const url = editingSource
                ? `/api/fund-sources/${editingSource.id}`
                : '/api/fund-sources';

            const method = editingSource ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to save fund source');
            }

            message.success(
                editingSource
                    ? 'Fund source updated successfully'
                    : 'Fund source created successfully'
            );

            form.resetFields();
            onSuccess();
        } catch (error) {
            message.error('Failed to save fund source');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={editingSource ? 'Edit Fund Source' : 'Create Fund Source'}
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
            confirmLoading={loading}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                name="fund_source_form"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: 'Please input the fund source name!' },
                        { max: 100, message: 'Name cannot exceed 100 characters' }
                    ]}
                >
                    <Input placeholder="e.g., My Savings Account" />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please select a type!' }]}
                >
                    <Select placeholder="Select a type">
                        <Option value="bank">Bank Account</Option>
                        <Option value="cash">Cash</Option>
                        <Option value="credit">Credit Card</Option>
                        <Option value="investment">Investment</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditFundSourceModal;