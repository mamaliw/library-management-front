import axios from 'axios';
import { toast } from 'react-toastify';

// Example base URL - adjust to match your server
const API_BASE_URL = 'http://localhost:3001/';

// Create an Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor to attach Bearer token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Optional: Global response error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Display error toast
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else if (error.message) {
            toast.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
