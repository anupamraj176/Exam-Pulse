import express from 'express';
import {
  getNotifications,
  getTickerNotifications,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { objectIdValidation, paginationValidation } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getNotifications);
router.get('/ticker', getTickerNotifications);

// Protected routes
router.get('/me', protect, paginationValidation, getUserNotifications);
router.put('/:id/read', protect, objectIdValidation('id'), markAsRead);
router.put('/read-all', protect, markAllAsRead);

// Admin routes
router.post('/', protect, authorize('admin'), createNotification);
router.put('/:id', protect, authorize('admin'), objectIdValidation('id'), updateNotification);
router.delete('/:id', protect, authorize('admin'), objectIdValidation('id'), deleteNotification);

export default router;
