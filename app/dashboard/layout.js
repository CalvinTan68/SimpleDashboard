'use client';

import { Layout } from "antd";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
            <Layout hasSider style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ProtectedRoute>
    );
}