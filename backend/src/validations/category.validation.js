const { body, param } = require('express-validator');
const { handleValidationErrors } = require('./validate');

const createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  handleValidationErrors
];

const updateCategoryValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid category ID'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),

  handleValidationErrors
];

const categoryIdValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid category ID'),

  handleValidationErrors
];

const categorySlugValidation = [
  param('slug')
    .trim()
    .notEmpty().withMessage('Category slug is required'),

  handleValidationErrors
];

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation,
  categorySlugValidation
};
