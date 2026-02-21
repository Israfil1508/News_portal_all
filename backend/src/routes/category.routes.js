const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers');
const { authenticate, isAdmin } = require('../middlewares');
const { 
  createCategoryValidation, 
  updateCategoryValidation, 
  categoryIdValidation,
  categorySlugValidation 
} = require('../validations');

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', categoryController.getAllCategories);

/**
 * @route   GET /api/categories/slug/:slug
 * @desc    Get category by slug
 * @access  Public
 */
router.get('/slug/:slug', categorySlugValidation, categoryController.getCategoryBySlug);

/**
 * @route   GET /api/categories/:id
 * @desc    Get category by ID
 * @access  Public
 */
router.get('/:id', categoryIdValidation, categoryController.getCategoryById);

/**
 * @route   POST /api/categories
 * @desc    Create new category
 * @access  Private (Admin only)
 */
router.post('/', authenticate, isAdmin, createCategoryValidation, categoryController.createCategory);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update category
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, isAdmin, updateCategoryValidation, categoryController.updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete category
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, isAdmin, categoryIdValidation, categoryController.deleteCategory);

module.exports = router;
