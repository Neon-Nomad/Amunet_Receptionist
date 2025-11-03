import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('amunet_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('amunet_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API methods
export const auth = {
  signup: (data: { email: string; password: string; name?: string }) =>
    api.post('/api/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
};

export const onboarding = {
  saveBusiness: (data: any) => api.post('/api/onboarding/business', data),
  saveContact: (data: any) => api.post('/api/onboarding/contact', data),
  saveServices: (data: any) => api.post('/api/onboarding/services', data),
  saveIntegration: (data: any) => api.post('/api/onboarding/integration', data),
  saveBranding: (data: any) => api.post('/api/onboarding/branding', data),
  complete: (data: any) => api.post('/api/onboarding/complete', data),
};

export const studio = {
  generateImage: (data: { prompt: string; size?: string }) =>
    api.post('/api/image/generate', data),
};

export const motion = {
  generateVideo: (data: { prompt: string; aspectRatio?: string; duration?: number; businessId: string }) =>
    api.post('/api/video/generate', data),
  generateSora: (data: { prompt: string; aspectRatio?: string; duration?: number; businessId: string }) =>
    api.post('/api/video/sora', data),
};

export const leads = {
  getAll: (businessId: string) => api.get(`/api/leads?businessId=${businessId}`),
  getById: (id: string) => api.get(`/api/leads/${id}`),
};