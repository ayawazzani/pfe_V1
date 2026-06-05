import axios from 'axios';

// Create an Axios instance pointing to the Laravel API
const api = axios.create({
    baseURL: 'http://ecomv1.alwaysdata.net/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

// Optional: Add a request interceptor (e.g., to attach auth tokens manually if not using Sanctum cookies)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Optional: Add a response interceptor for global error handling
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Unauthenticated (e.g. redirect to login)
            console.error('Session expired or unauthenticated.');
        }
        return Promise.reject(error);
    }
);

export default api;
