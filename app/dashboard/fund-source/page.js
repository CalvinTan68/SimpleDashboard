'use client';

import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader";
import CreateEditFundSourceModal from "../../../components/CreateEditFundSourceModal";

function FundSource() {
    const [fundSources, setFundSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingSource, setEditingSource] = useState(null);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => type?.charAt(0).toUpperCase() + type?.slice(1)
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => new Date(date).toLocaleDateString()
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this fund source?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchFundSources();
    }, []);

    const fetchFundSources = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/fund-sources');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setFundSources(data);
        } catch (error) {
            message.error('Failed to fetch fund sources');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (record) => {
        setEditingSource(record);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/fund-sources/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete');
            
            message.success('Fund source deleted successfully');
            fetchFundSources();
        } catch (error) {
            message.error('Failed to delete fund source');
            console.error(error);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setEditingSource(null);
    };

    const handleModalSuccess = () => {
        fetchFundSources();
        handleModalClose();
    };

    return (
        <>
            <PageHeader
                divider
                title="Fund Sources"
                subtitle="Manage your fund sources"
                extra={[
                    <Button
                        key="add"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModalVisible(true)}
                    >
                        Add Fund Source
                    </Button>
                ]}
            />
            <Table
                columns={columns}
                dataSource={fundSources}
                loading={loading}
                rowKey="id"
            />
            <CreateEditFundSourceModal
                visible={modalVisible}
                onCancel={handleModalClose}
                onSuccess={handleModalSuccess}
                editingSource={editingSource}
            />
        </>
    );
}

export default FundSource;