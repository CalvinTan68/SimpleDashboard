'use client';

import { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

export default function CreateEditFundSourceModal({ 
  visible, 
  onClose, 
  onSubmit, 
  editingSource,
  loading 
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (editingSource) {
        form.setFieldsValue(editingSource);
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingSource, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      if (error.errorFields) {
        message.error('Please fill in all required fields');
      }
    }
  };

  return (
    <Modal
      title={editingSource ? 'Edit Fund Source' : 'Create Fund Source'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      okText={editingSource ? 'Update' : 'Create'}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter fund source name' }]}
        >
          <Input placeholder="e.g., Main Checking Account" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select fund source type' }]}
        >
          <Select placeholder="Select type">
            <Option value="BANK">Bank Account</Option>
            <Option value="CASH">Cash</Option>
            <Option value="CREDIT_CARD">Credit Card</Option>
            <Option value="INVESTMENT">Investment</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}