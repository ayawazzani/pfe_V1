import axios from 'axios';

// Create an Axios instance pointing to the Laravel API
const api = axios.create({
    // VITE_API_URL should be defined in a .env file (e.g., http://localhost:8000/api)
    // If it's not defined, it defaults to localhost:8000/api
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    
    // Important: The following setting allows sending cookies (required by Laravel Sanctum for auth)
    withCredentials: true,
    
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Optional: Add a request interceptor (e.g., to attach auth tokens manually if not using Sanctum cookies)
api.interceptors.request.use(config => {
    // You could get a token from localStorage and attach it here
    // const token = localStorage.getItem('token');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
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
