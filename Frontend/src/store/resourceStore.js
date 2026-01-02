import { create } from 'zustand';
import resourceService from '../services/resourceService';

const useResourceStore = create((set, get) => ({
  resources: [],
  featuredResources: [],
  trendingResources: [],
  currentResource: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },
  filters: {
    type: 'all',
    category: 'all',
    subject: 'all',
    search: '',
    sort: 'popular',
  },

  // Fetch resources with filters
  fetchResources: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const { filters, pagination } = get();
      const response = await resourceService.getResources({
        ...filters,
        ...params,
        page: params.page || pagination.page,
        limit: params.limit || pagination.limit,
      });
      
      if (response.success) {
        set({
          resources: response.data.resources,
          pagination: response.data.pagination,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch resources',
        isLoading: false,
      });
    }
  },

  // Fetch featured resources
  fetchFeaturedResources: async () => {
    try {
      const response = await resourceService.getFeaturedResources();
      if (response.success) {
        set({ featuredResources: response.data.resources });
      }
    } catch (error) {
      console.error('Failed to fetch featured resources:', error);
    }
  },

  // Fetch trending resources
  fetchTrendingResources: async () => {
    try {
      const response = await resourceService.getTrendingResources();
      if (response.success) {
        set({ trendingResources: response.data.resources });
      }
    } catch (error) {
      console.error('Failed to fetch trending resources:', error);
    }
  },

  // Fetch single resource
  fetchResourceById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await resourceService.getResourceById(id);
      if (response.success) {
        set({
          currentResource: response.data.resource,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch resource',
        isLoading: false,
      });
    }
  },

  // Search resources
  searchResources: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const response = await resourceService.searchResources(query, get().filters);
      if (response.success) {
        set({
          resources: response.data.resources,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Search failed',
        isLoading: false,
      });
    }
  },

  // Record download
  recordDownload: async (resourceId) => {
    try {
      await resourceService.recordDownload(resourceId);
      // Update local resource stats
      const resources = get().resources.map((r) =>
        r._id === resourceId
          ? { ...r, stats: { ...r.stats, downloads: r.stats.downloads + 1 } }
          : r
      );
      set({ resources });
    } catch (error) {
      console.error('Failed to record download:', error);
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
        type: 'all',
        category: 'all',
        subject: 'all',
        search: '',
        sort: 'popular',
      },
    });
  },

  // Set page
  setPage: (page) => {
    set({ pagination: { ...get().pagination, page } });
  },

  // Clear current resource
  clearCurrentResource: () => {
    set({ currentResource: null });
  },
}));

export default useResourceStore;
