import axios from 'axios';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or session storage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 Unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        // Clear cookie
        document.cookie =
          'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // Optionally redirect to login
        window.location.href = '/auth/sign-in';
      }
    }
    return Promise.reject(error);
  }
);
