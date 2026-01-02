import api from './api';

// Get all resources with filters
export const getResources = async (params = {}) => {
  const response = await api.get('/resources', { params });
  return response.data;
};

// Get single resource by ID
export const getResourceById = async (id) => {
  const response = await api.get(`/resources/${id}`);
  return response.data;
};

// Get featured resources
export const getFeaturedResources = async () => {
  const response = await api.get('/resources/featured');
  return response.data;
};

// Get trending resources
export const getTrendingResources = async () => {
  const response = await api.get('/resources/trending');
  return response.data;
};

// Search resources
export const searchResources = async (query, filters = {}) => {
  const response = await api.get('/resources/search', {
    params: { q: query, ...filters },
  });
  return response.data;
};

// Record download
export const recordDownload = async (resourceId) => {
  const response = await api.post(`/resources/${resourceId}/download`);
  return response.data;
};

// Add review to resource
export const addReview = async (resourceId, reviewData) => {
  const response = await api.post(`/resources/${resourceId}/reviews`, reviewData);
  return response.data;
};

// Create resource
export const createResource = async (resourceData) => {
  const response = await api.post('/resources', resourceData);
  return response.data;
};

// Update resource
export const updateResource = async (id, resourceData) => {
  const response = await api.put(`/resources/${id}`, resourceData);
  return response.data;
};

// Delete resource
export const deleteResource = async (id) => {
  const response = await api.delete(`/resources/${id}`);
  return response.data;
};

// Admin: Get resource stats
export const getResourceStats = async () => {
  const response = await api.get('/resources/stats');
  return response.data;
};

export default {
  getResources,
  getResourceById,
  getFeaturedResources,
  getTrendingResources,
  searchResources,
  recordDownload,
  addReview,
  createResource,
  updateResource,
  deleteResource,
  getResourceStats,
};
