import { Layout } from "antd";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Sidebar from "./Components/Sidebar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import FundSource from "./Pages/FundSource";
import Home from "./Pages/Home";
import Transactions from "./Pages/Transactions";

const { Sider, Content } = Layout;

const AppContent = () => {
    const pageList = [
        {
            key: "/",
            element: <Home />,
        },
        {
            key: "/fund-source",
            element: <FundSource />,
        },
        {
            key: "/transactions",
            element: <Transactions />,
        },
    ];

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <Layout hasSider>
                            <Sidebar />
                            <Layout>
                                <Content>
                                    <Routes>
                                        {pageList?.map((pages) => (
                                            <Route
                                                path={pages.key}
                                                element={pages.element}
                                                key={pages.key}
                                            />
                                        ))}
                                        <Route
                                            path="*"
                                            element={<Navigate to="/" />}
                                        />
                                    </Routes>
                                </Content>
                            </Layout>
                        </Layout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
