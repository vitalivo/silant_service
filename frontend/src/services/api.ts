import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Временно используем any вместо типов
export const machineService = {
  getAll: () => api.get('/machines/'),
  getById: (id: number) => api.get(`/machines/${id}/`),
  searchBySerial: (serial: string) => api.get(`/machines/search_by_serial/?serial=${serial}`),
};

export const maintenanceService = {
  getAll: () => api.get('/maintenance/'),
};

export const complaintService = {
  getAll: () => api.get('/complaints/'),
};

export default api;