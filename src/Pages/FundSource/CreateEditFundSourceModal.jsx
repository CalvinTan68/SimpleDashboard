import { Button, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { API_FUND_SOURCES } from "../../constants";
import clientAPI from "../../hooks/clientAPI";

export default function CreateEditFundSourceModal({
    visible,
    data,
    onClose,
    onSuccess,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (data) {
                form.setFieldsValue(data);
            }
        }
    }, [visible, data, form]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            if (data) {
                await clientAPI.put(`${API_FUND_SOURCES}/${data.id}`, values);
                message.success("Fund source updated successfully");
            } else {
                await clientAPI.post(API_FUND_SOURCES, values);
                message.success("Fund source created successfully");
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving fund source:", error);
            message.error(
                error.response?.data?.message || "Failed to save fund source"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={data ? "Edit Fund Source" : "Add Fund Source"}
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={data || {}}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the fund source name!",
                        },
                    ]}
                >
                    <Input
                        placeholder="e.g., Bank Account, E-Wallet"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="number"
                    label="Account Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input the account number!",
                        },
                    ]}
                >
                    <Input placeholder="e.g., 1234567890" size="large" />
                </Form.Item>
                <Form.Item>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {data ? "Update" : "Create"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
