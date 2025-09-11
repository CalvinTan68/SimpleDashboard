'use client';

import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";

function CreateEditFundSourceModal({ visible, onCancel, onSuccess, editingSource }) {
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
                body: JSON.stringify(values)
            });

            if (!response.ok) throw new Error('Failed to save');

            message.success(`Fund source ${editingSource ? 'updated' : 'created'} successfully`);
            onSuccess();
            form.resetFields();
        } catch (error) {
            if (error.errorFields) {
                return;
            }
            message.error('Failed to save fund source');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={editingSource ? "Edit Fund Source" : "Create Fund Source"}
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
            confirmLoading={loading}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input placeholder="e.g., Main Checking Account" />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please select the type!' }]}
                >
                    <Select placeholder="Select a type">
                        <Select.Option value="bank">Bank Account</Select.Option>
                        <Select.Option value="cash">Cash</Select.Option>
                        <Select.Option value="credit">Credit Card</Select.Option>
                        <Select.Option value="investment">Investment</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateEditFundSourceModal;