import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../constant';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});

// Add a request interceptor to include the Authorization header if the token is available
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever it's stored (e.g., Redux, cookies)
    const token = localStorage.getItem('accessToken'); // Adjust according to your token storage

    if (token) {
      // If token exists, add it to the request header
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, add a response interceptor to handle errors globally (e.g., for 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Please log in again.');
      // Example: Redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
