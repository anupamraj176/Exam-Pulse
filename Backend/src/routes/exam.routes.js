import express from 'express';
import {
  getExams,
  getExam,
  getExamBySlug,
  getExamsByCategory,
  getUpcomingExams,
  getExamCalendar,
  subscribeToExam,
  unsubscribeFromExam,
  createExam,
  updateExam,
  deleteExam,
  getExamCategories,
} from '../controllers/exam.controller.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';
import { examValidation, objectIdValidation, paginationValidation } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getExams);
router.get('/categories', getExamCategories);
router.get('/upcoming', getUpcomingExams);
router.get('/calendar', getExamCalendar);
router.get('/category/:category', getExamsByCategory);
router.get('/slug/:slug', getExamBySlug);
router.get('/:id', objectIdValidation('id'), getExam);

// Protected routes
router.post('/:id/subscribe', protect, objectIdValidation('id'), subscribeToExam);
router.delete('/:id/subscribe', protect, objectIdValidation('id'), unsubscribeFromExam);

// Admin routes
router.post('/', protect, authorize('admin'), examValidation, createExam);
router.put('/:id', protect, authorize('admin'), objectIdValidation('id'), updateExam);
router.delete('/:id', protect, authorize('admin'), objectIdValidation('id'), deleteExam);

export default router;
