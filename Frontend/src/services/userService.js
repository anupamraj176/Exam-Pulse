import api from './api';

// Get user profile
export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
export const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

// Get user bookmarks
export const getBookmarks = async () => {
  const response = await api.get('/users/bookmarks');
  return response.data;
};

// Add bookmark
export const addBookmark = async (resourceId) => {
  const response = await api.post(`/users/bookmarks/${resourceId}`);
  return response.data;
};

// Remove bookmark
export const removeBookmark = async (resourceId) => {
  const response = await api.delete(`/users/bookmarks/${resourceId}`);
  return response.data;
};

// Get study stats
export const getStudyStats = async () => {
  const response = await api.get('/users/stats');
  return response.data;
};

// Get user stats (dashboard)
export const getUserStats = async () => {
  const response = await api.get('/users/stats');
  return response.data;
};

// Get recent activity
export const getRecentActivity = async () => {
  const response = await api.get('/users/activity');
  return response.data;
};

// Update study stats
export const updateStudyStats = async (statsData) => {
  const response = await api.put('/users/stats', statsData);
  return response.data;
};

// Set target exams
export const setTargetExams = async (examIds) => {
  const response = await api.put('/users/target-exams', { examIds });
  return response.data;
};

export default {
  getProfile,
  updateProfile,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getStudyStats,
  getUserStats,
  getRecentActivity,
  updateStudyStats,
  setTargetExams,
};
