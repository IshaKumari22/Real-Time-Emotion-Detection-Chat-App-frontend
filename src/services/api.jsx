
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',  // Backend address
});

// Auto-add token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
