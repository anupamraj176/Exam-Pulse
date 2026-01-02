import express from 'express';
import {
  scrapeNotifications,
  scrapeExams,
  getScraperStatus,
  runScraper,
} from '../controllers/scraper.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All scraper routes are admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/status', getScraperStatus);
router.post('/notifications', scrapeNotifications);
router.post('/exams', scrapeExams);
router.post('/run', runScraper);

export default router;
