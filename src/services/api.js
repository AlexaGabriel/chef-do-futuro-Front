import axios from 'axios';

// Base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.erro || error.message || 'Erro ao comunicar com o servidor';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
