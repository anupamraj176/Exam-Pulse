import express from 'express';
import {
  getResources,
  getResource,
  getFeaturedResources,
  getTrendingResources,
  searchResources,
  recordDownload,
  addReview,
  createResource,
  updateResource,
  deleteResource,
  getResourceStats,
} from '../controllers/resource.controller.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';
import { resourceValidation, objectIdValidation, paginationValidation } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getResources);
router.get('/featured', getFeaturedResources);
router.get('/trending', getTrendingResources);
router.get('/search', searchResources);
router.get('/stats', protect, authorize('admin'), getResourceStats);
router.get('/:id', objectIdValidation('id'), getResource);
router.post('/:id/download', objectIdValidation('id'), recordDownload);

// Protected routes
router.post('/', protect, resourceValidation, createResource);
router.post('/:id/reviews', protect, objectIdValidation('id'), addReview);
router.put('/:id', protect, objectIdValidation('id'), updateResource);
router.delete('/:id', protect, objectIdValidation('id'), deleteResource);

export default router;
