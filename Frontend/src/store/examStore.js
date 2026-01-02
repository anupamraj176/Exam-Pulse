import { create } from 'zustand';
import examService from '../services/examService';

const useExamStore = create((set, get) => ({
  exams: [],
  categories: [],
  upcomingExams: [],
  calendarEvents: [],
  currentExam: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },
  filters: {
    category: '',
    status: '',
    search: '',
  },

  // Fetch all exams
  fetchExams: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const { filters, pagination } = get();
      const response = await examService.getExams({
        ...filters,
        ...params,
        page: params.page || pagination.page,
        limit: params.limit || pagination.limit,
      });
      
      if (response.success) {
        set({
          exams: response.data.exams,
          pagination: response.data.pagination,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch exams',
        isLoading: false,
      });
    }
  },

  // Fetch exam categories
  fetchCategories: async () => {
    try {
      const response = await examService.getExamCategories();
      if (response.success) {
        set({ categories: response.data.categories });
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  // Fetch upcoming exams
  fetchUpcomingExams: async () => {
    try {
      const response = await examService.getUpcomingExams();
      if (response.success) {
        set({ upcomingExams: response.data.exams });
      }
    } catch (error) {
      console.error('Failed to fetch upcoming exams:', error);
    }
  },

  // Fetch exam calendar
  fetchCalendar: async (month, year) => {
    try {
      const response = await examService.getExamCalendar(month, year);
      if (response.success) {
        set({ calendarEvents: response.data.events });
      }
    } catch (error) {
      console.error('Failed to fetch calendar:', error);
    }
  },

  // Fetch single exam
  fetchExamById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await examService.getExamById(id);
      if (response.success) {
        set({
          currentExam: response.data.exam,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch exam',
        isLoading: false,
      });
    }
  },

  // Fetch exam by slug
  fetchExamBySlug: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await examService.getExamBySlug(slug);
      if (response.success) {
        set({
          currentExam: response.data.exam,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch exam',
        isLoading: false,
      });
    }
  },

  // Subscribe to exam
  subscribeToExam: async (examId) => {
    try {
      await examService.subscribeToExam(examId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to subscribe',
      };
    }
  },

  // Unsubscribe from exam
  unsubscribeFromExam: async (examId) => {
    try {
      await examService.unsubscribeFromExam(examId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to unsubscribe',
      };
    }
  },

  // Update filters
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  // Reset filters
  resetFilters: () => {
    set({
      filters: {
        category: '',
        status: '',
        search: '',
      },
    });
  },

  // Clear current exam
  clearCurrentExam: () => {
    set({ currentExam: null });
  },
}));

export default useExamStore;
