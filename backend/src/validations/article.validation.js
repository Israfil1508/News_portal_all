const { body, param } = require('express-validator');
const { handleValidationErrors } = require('./validate');

const createArticleValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),

  body('summary')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Summary cannot exceed 500 characters'),

  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),

  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Please provide a valid image URL'),

  body('categoryId')
    .notEmpty().withMessage('Category is required')
    .isInt({ min: 1 }).withMessage('Invalid category ID'),

  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),

  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be a boolean'),

  handleValidationErrors
];

const updateArticleValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid article ID'),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),

  body('summary')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Summary cannot exceed 500 characters'),

  body('content')
    .optional()
    .trim()
    .isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),

  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Please provide a valid image URL'),

  body('categoryId')
    .optional()
    .isInt({ min: 1 }).withMessage('Invalid category ID'),

  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),

  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be a boolean'),

  handleValidationErrors
];

const articleIdValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid article ID'),

  handleValidationErrors
];

const articleSlugValidation = [
  param('slug')
    .trim()
    .notEmpty().withMessage('Article slug is required'),

  handleValidationErrors
];

module.exports = {
  createArticleValidation,
  updateArticleValidation,
  articleIdValidation,
  articleSlugValidation
};
