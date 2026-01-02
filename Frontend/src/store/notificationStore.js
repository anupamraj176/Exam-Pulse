import { create } from 'zustand';
import notificationService from '../services/notificationService';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  tickerNotifications: [],
  userNotifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },

  // Fetch all notifications
  fetchNotifications: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await notificationService.getNotifications(params);
      if (response.success) {
        set({
          notifications: response.data.notifications,
          pagination: response.data.pagination,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch notifications',
        isLoading: false,
      });
    }
  },

  // Fetch ticker notifications
  fetchTickerNotifications: async () => {
    try {
      const response = await notificationService.getTickerNotifications();
      if (response.success) {
        set({ tickerNotifications: response.data.notifications });
      }
    } catch (error) {
      console.error('Failed to fetch ticker notifications:', error);
    }
  },

  // Fetch user notifications
  fetchUserNotifications: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await notificationService.getUserNotifications(params);
      if (response.success) {
        set({
          userNotifications: response.data.notifications,
          unreadCount: response.data.unreadCount,
          pagination: response.data.pagination,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch notifications',
        isLoading: false,
      });
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      const userNotifications = get().userNotifications.map((n) =>
        n._id === notificationId ? { ...n, isRead: true } : n
      );
      set({
        userNotifications,
        unreadCount: Math.max(0, get().unreadCount - 1),
      });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  },

  // Mark all as read
  markAllAsRead: async () => {
    try {
      await notificationService.markAllAsRead();
      const userNotifications = get().userNotifications.map((n) => ({
        ...n,
        isRead: true,
      }));
      set({
        userNotifications,
        unreadCount: 0,
      });
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  },

  // Add new notification (from socket)
  addNotification: (notification) => {
    set({
      notifications: [notification, ...get().notifications],
      tickerNotifications: [notification, ...get().tickerNotifications.slice(0, 9)],
      userNotifications: [{ ...notification, isRead: false }, ...get().userNotifications],
      unreadCount: get().unreadCount + 1,
    });
  },

  // Clear notifications
  clearNotifications: () => {
    set({
      notifications: [],
      userNotifications: [],
      unreadCount: 0,
    });
  },
}));

export default useNotificationStore;
