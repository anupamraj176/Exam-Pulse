import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

// Register a new user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  if (response.data.success) {
    // Store token and user data
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.data.token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.data.user));
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
  }
  
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  
  if (response.data.success) {
    // Store token and user data
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.data.token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.data.user));
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
  }
  
  return response.data;
};

// Logout user
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem('refreshToken');
  }
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Refresh token
export const refreshToken = async () => {
  const token = localStorage.getItem('refreshToken');
  
  if (!token) {
    throw new Error('No refresh token available');
  }
  
  const response = await api.post('/auth/refresh-token', { refreshToken: token });
  
  if (response.data.success) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.data.token);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
  }
  
  return response.data;
};

// Update password
export const updatePassword = async (passwordData) => {
  const response = await api.put('/auth/update-password', passwordData);
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return !!token;
};

// Get stored user data
export const getStoredUser = () => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return userData ? JSON.parse(userData) : null;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
  updatePassword,
  forgotPassword,
  isAuthenticated,
  getStoredUser,
};
