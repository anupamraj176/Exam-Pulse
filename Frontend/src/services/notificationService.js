import api from './api';

// Get all notifications
export const getNotifications = async (params = {}) => {
  const response = await api.get('/notifications', { params });
  return response.data;
};

// Get ticker notifications (for live updates bar)
export const getTickerNotifications = async () => {
  const response = await api.get('/notifications/ticker');
  return response.data;
};

// Get user's notifications
export const getUserNotifications = async (params = {}) => {
  const response = await api.get('/notifications/me', { params });
  return response.data;
};

// Mark notification as read
export const markAsRead = async (notificationId) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  return response.data;
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  const response = await api.put('/notifications/read-all');
  return response.data;
};

// Admin: Create notification
export const createNotification = async (notificationData) => {
  const response = await api.post('/notifications', notificationData);
  return response.data;
};

// Admin: Update notification
export const updateNotification = async (id, notificationData) => {
  const response = await api.put(`/notifications/${id}`, notificationData);
  return response.data;
};

// Admin: Delete notification
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

export default {
  getNotifications,
  getTickerNotifications,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
  updateNotification,
  deleteNotification,
};
