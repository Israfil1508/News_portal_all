const { body, param } = require('express-validator');
const { handleValidationErrors } = require('./validate');

const updateUserValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid user ID'),

  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),

  body('role')
    .optional()
    .isIn(['admin', 'editor', 'user']).withMessage('Invalid role'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),

  handleValidationErrors
];

const updatePasswordValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid user ID'),

  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),

  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
    .matches(/\d/).withMessage('New password must contain at least one number'),

  handleValidationErrors
];

const userIdValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid user ID'),

  handleValidationErrors
];

module.exports = {
  updateUserValidation,
  updatePasswordValidation,
  userIdValidation
};
