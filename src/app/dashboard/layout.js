'use client';

import { Layout } from "antd";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
            <Layout hasSider style={{ height: '100vh', overflow: 'hidden' }}>
                <Sidebar />
                <Layout style={{ overflow: 'hidden' }}>
                    <Content style={{ 
                        overflow: 'auto',
                        height: '100vh',
                        overscrollBehavior: 'none'
                    }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ProtectedRoute>
    );
}