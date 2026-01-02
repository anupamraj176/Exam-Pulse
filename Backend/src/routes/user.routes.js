import express from 'express';
import {
  getProfile,
  updateProfile,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getStudyStats,
  updateStudyStats,
  setTargetExams,
  getRecentActivity,
  getAllUsers,
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Bookmark routes
router.get('/bookmarks', getBookmarks);
router.post('/bookmarks/:resourceId', addBookmark);
router.delete('/bookmarks/:resourceId', removeBookmark);

// Study stats routes
router.get('/stats', getStudyStats);
router.put('/stats', updateStudyStats);

// Activity routes
router.get('/activity', getRecentActivity);

// Target exams
router.put('/target-exams', setTargetExams);

// Admin routes
router.get('/', authorize('admin'), getAllUsers);

export default router;
