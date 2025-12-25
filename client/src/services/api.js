import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://riseup-tech-2025-moph.vercel.app//api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Website Data API
export const websiteDataAPI = {
  get: () => api.get('/website-data'),
  update: (data) => api.put('/website-data', data),
};

// Contact API
export const contactAPI = {
  create: (data) => api.post('/contacts', data),
  getAll: () => api.get('/contacts'),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// Reviews API
export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getAll: () => api.get('/reviews'),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// Users API
export const userAPI = {
  create: (data) => api.post('/users', data),
  getAll: () => api.get('/users'),
};

// Job Applications API
export const applicationAPI = {
  create: (data) => api.post('/applications', data),
  getAll: () => api.get('/applications'),
};

export default api;