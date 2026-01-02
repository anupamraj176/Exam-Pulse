import api from './api';

// Get all exams with filters
export const getExams = async (params = {}) => {
  const response = await api.get('/exams', { params });
  return response.data;
};

// Get single exam by ID
export const getExamById = async (id) => {
  const response = await api.get(`/exams/${id}`);
  return response.data;
};

// Get exam by slug
export const getExamBySlug = async (slug) => {
  const response = await api.get(`/exams/slug/${slug}`);
  return response.data;
};

// Get exams by category
export const getExamsByCategory = async (category) => {
  const response = await api.get(`/exams/category/${category}`);
  return response.data;
};

// Get exam categories with counts
export const getExamCategories = async () => {
  const response = await api.get('/exams/categories');
  return response.data;
};

// Get upcoming exams
export const getUpcomingExams = async () => {
  const response = await api.get('/exams/upcoming');
  return response.data;
};

// Get exam calendar events
export const getExamCalendar = async (month, year) => {
  const response = await api.get('/exams/calendar', {
    params: { month, year },
  });
  return response.data;
};

// Subscribe to exam updates
export const subscribeToExam = async (examId) => {
  const response = await api.post(`/exams/${examId}/subscribe`);
  return response.data;
};

// Unsubscribe from exam updates
export const unsubscribeFromExam = async (examId) => {
  const response = await api.delete(`/exams/${examId}/subscribe`);
  return response.data;
};

// Admin: Create exam
export const createExam = async (examData) => {
  const response = await api.post('/exams', examData);
  return response.data;
};

// Admin: Update exam
export const updateExam = async (id, examData) => {
  const response = await api.put(`/exams/${id}`, examData);
  return response.data;
};

// Admin: Delete exam
export const deleteExam = async (id) => {
  const response = await api.delete(`/exams/${id}`);
  return response.data;
};

export default {
  getExams,
  getExamById,
  getExamBySlug,
  getExamsByCategory,
  getExamCategories,
  getUpcomingExams,
  getExamCalendar,
  subscribeToExam,
  unsubscribeFromExam,
  createExam,
  updateExam,
  deleteExam,
};
