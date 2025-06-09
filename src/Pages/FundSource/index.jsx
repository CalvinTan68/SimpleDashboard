import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Descriptions, message, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import PageHeader from "../../Components/PageHeader";
import { API_FUND_SOURCES } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import clientAPI from "../../hooks/clientAPI";
import useFetch from "../../hooks/useFetch";
import CreateEditFundSourceModal from "./CreateEditFundSourceModal";

function FundSource() {
    const { user } = useAuth();
    const [editingRecord, setEditingRecord] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {
        data: fundSources,
        isLoading: isLoadingFundSources,
        refetch,
    } = useFetch(API_FUND_SOURCES, { userId: user.id });

    const handleEdit = (record) => {
        setEditingRecord(record);
        setIsModalVisible(true);
    };

    const handleAddNew = () => {
        setEditingRecord(null);
        setIsModalVisible(true);
    };

    const handleSuccess = () => {
        refetch();
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Delete Fund Source",
            content: (
                <>
                    <p>Are you sure you want to delete this fund source?</p>
                    <Descriptions size="small" column={1} bordered>
                        <Descriptions.Item label="Name">
                            {record.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Account Number">
                            {record.number}
                        </Descriptions.Item>
                    </Descriptions>
                </>
            ),
            okText: "Delete",
            cancelText: "Cancel",
            centered: true,
            okButtonProps: { danger: true },
            onOk: () => {
                clientAPI
                    .delete(`${API_FUND_SOURCES}/${record.id}`)
                    .then(() => {
                        message.success("Fund source deleted successfully");
                        refetch();
                    })
                    .catch((err) => {
                        console.error("Error deleting fund source:", err);
                        message.error(
                            err.response?.data?.message ||
                                "Failed to delete fund source"
                        );
                        throw err; // This will keep the modal open if there's an error
                    });
            },
        });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: "Account Number",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "Action",
            key: "action",
            align: "right",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => handleEdit(record)}
                        icon={<EditOutlined />}
                        title="Edit"
                        shape="circle"
                    />
                    <Button
                        onClick={() => handleDelete(record)}
                        icon={<DeleteOutlined />}
                        danger
                        title="Delete"
                        shape="circle"
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <PageHeader
                title="Fund Sources"
                subtitle="Manage your bank accounts and other funding sources"
                divider
            />

            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddNew}
            >
                Add Fund Source
            </Button>

            <Table
                columns={columns}
                dataSource={fundSources?.fundSources || []}
                pagination={{
                    ...fundSources?.pagination,
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
                loading={isLoadingFundSources}
                rowKey="id"
            />

            <CreateEditFundSourceModal
                visible={isModalVisible}
                data={editingRecord}
                onClose={() => setIsModalVisible(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
}

export default FundSource;
