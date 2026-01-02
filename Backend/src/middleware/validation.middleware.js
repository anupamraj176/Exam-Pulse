import { body, param, query, validationResult } from 'express-validator';
import { ApiError } from './error.middleware.js';

// Validation result handler
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    throw new ApiError(400, 'Validation failed', formattedErrors);
  }
  next();
};

// Auth validations
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Please enter a valid 10-digit phone number'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validate,
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validate,
];

// Resource validations
export const resourceValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('type')
    .notEmpty()
    .withMessage('Resource type is required')
    .isIn(['notes', 'pyq', 'video', 'mock', 'book', 'other'])
    .withMessage('Invalid resource type'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isIn(['math', 'reasoning', 'english', 'gk', 'science', 'polity', 'history', 'geography', 'economy', 'computer', 'other'])
    .withMessage('Invalid subject'),
  validate,
];

// Exam validations
export const examValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Exam name is required'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['ssc', 'banking', 'railways', 'upsc', 'state-psc', 'defence', 'teaching', 'other'])
    .withMessage('Invalid category'),
  body('conductingBody')
    .trim()
    .notEmpty()
    .withMessage('Conducting body is required'),
  validate,
];

// MongoDB ObjectId validation
export const objectIdValidation = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName}`),
  validate,
];

// Pagination validation
export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  validate,
];

export default {
  validate,
  registerValidation,
  loginValidation,
  resourceValidation,
  examValidation,
  objectIdValidation,
  paginationValidation,
};
