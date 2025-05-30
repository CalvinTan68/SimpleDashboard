import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const clientAPI = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to inject token and x-user-id from localStorage
clientAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (token) {
            config.headers["Authorization"] = token;
        }

        if (user?.id) {
            config.headers["x-user-id"] = user.id;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default clientAPI;
