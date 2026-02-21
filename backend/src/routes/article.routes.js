const express = require('express');
const router = express.Router();
const { articleController } = require('../controllers');
const { authenticate, optionalAuth, isAdminOrEditor, isAdmin } = require('../middlewares');
const {
  createArticleValidation,
  updateArticleValidation,
  articleIdValidation,
  articleSlugValidation
} = require('../validations');

/**
 * @route   GET /api/articles
 * @desc    Get all published articles (public)
 * @access  Public
 */
router.get('/', articleController.getPublicArticles);

/**
 * @route   GET /api/articles/featured
 * @desc    Get featured articles
 * @access  Public
 */
router.get('/featured', articleController.getFeaturedArticles);

/**
 * @route   GET /api/articles/latest
 * @desc    Get latest articles
 * @access  Public
 */
router.get('/latest', articleController.getLatestArticles);

/**
 * @route   GET /api/articles/admin
 * @desc    Get all articles (admin/editor view)
 * @access  Private (Admin or Editor)
 */
router.get('/admin', authenticate, isAdminOrEditor, articleController.getAllArticles);

/**
 * @route   GET /api/articles/slug/:slug
 * @desc    Get article by slug
 * @access  Public
 */
router.get('/slug/:slug', articleSlugValidation, articleController.getArticleBySlug);

/**
 * @route   GET /api/articles/:id
 * @desc    Get article by ID
 * @access  Public (published) / Private (all statuses for admin/editor)
 */
router.get('/:id', optionalAuth, articleIdValidation, articleController.getArticleById);

/**
 * @route   POST /api/articles
 * @desc    Create new article
 * @access  Private (Admin or Editor)
 */
router.post('/', authenticate, isAdminOrEditor, createArticleValidation, articleController.createArticle);

/**
 * @route   PUT /api/articles/:id
 * @desc    Update article
 * @access  Private (Admin or Editor - owner)
 */
router.put('/:id', authenticate, isAdminOrEditor, updateArticleValidation, articleController.updateArticle);

/**
 * @route   DELETE /api/articles/:id
 * @desc    Delete article
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, isAdmin, articleIdValidation, articleController.deleteArticle);

module.exports = router;
