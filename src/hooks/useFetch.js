import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const useFetch = (url, options = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { token, user } = useAuth();

    const baseUrl = import.meta.env.VITE_API_URL;

    // Build headers
    const buildHeaders = () => {
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `${token}`;
        }
        if (options.userId) {
            headers["x-user-id"] = options.userId;
        }
        return headers;
    };

    const fetchData = useCallback(async () => {
        if (!url) return;
        setLoading(true);
        setError(null);
        try {
            const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
            const response = await axios.get(fullUrl, {
                headers: buildHeaders(),
            });
            setData(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Something went wrong"
            );
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url, token, options.userId]);

    useEffect(() => {
        if (url) fetchData();
    }, [url, fetchData]);

    return {
        data,
        isLoading: loading,
        error,
        refetch: fetchData,
    };
};

export default useFetch;
