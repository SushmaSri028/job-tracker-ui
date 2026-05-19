import api from './axios';

export const applicationsApi = {
  getAll: () => api.get('/applications').then((res) => res.data),
  getById: (id) => api.get(`/applications/${id}`).then((res) => res.data),
  create: (data) => api.post('/applications', data).then((res) => res.data),
  update: (id, data) => api.put(`/applications/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/applications/${id}`).then((res) => res.data),
};