'use client';

import { Spin } from "antd";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="spin-container">
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect via useEffect
    }

    return children;
};

export default ProtectedRoute;