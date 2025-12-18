import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const endpoints = {
  // Users
  users: {
    list: () => api.get('/users'),
    get: (id: string) => api.get(`/users/${id}`),
    create: (data: any) => api.post('/users', data),
    update: (id: string, data: any) => api.put(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
  },
  // Products
  products: {
    list: () => api.get('/products'),
    get: (id: string) => api.get(`/products/${id}`),
    create: (data: any) => api.post('/products', data),
    update: (id: string, data: any) => api.put(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`),
  },
  // Orders
  orders: {
    list: () => api.get('/orders'),
    get: (id: string) => api.get(`/orders/${id}`),
    updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
  },
  // Categories
  categories: {
    list: () => api.get('/categories'),
    create: (data: any) => api.post('/categories', data),
    update: (id: string, data: any) => api.put(`/categories/${id}`, data),
    delete: (id: string) => api.delete(`/categories/${id}`),
  },
  // Coupons
  coupons: {
    list: () => api.get('/coupons'),
    create: (data: any) => api.post('/coupons', data),
    apply: (code: string) => api.post('/coupons/apply', { code }),
  },
  // Warehouses
  warehouses: {
    list: () => api.get('/warehouses'),
    get: (id: string) => api.get(`/warehouses/${id}`),
    create: (data: any) => api.post('/warehouses', data),
    update: (id: string, data: any) => api.put(`/warehouses/${id}`, data),
  },
};
