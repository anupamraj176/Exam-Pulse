import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  refreshToken,
  updatePassword,
  forgotPassword,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { registerValidation, loginValidation } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.use(protect); // All routes below this require authentication

router.get('/me', getMe);
router.post('/logout', logout);
router.put('/update-password', updatePassword);

export default router;
