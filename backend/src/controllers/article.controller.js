const { articleService } = require('../services');

class ArticleController {
  /**
   * Get all published articles (public)
   * GET /api/articles
   */
  async getPublicArticles(req, res, next) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        categoryId: req.query.categoryId,
        categorySlug: req.query.category,
        search: req.query.search,
        featured: req.query.featured === 'true'
      };
      const result = await articleService.getPublicArticles(options);
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all articles (admin/editor)
   * GET /api/articles/admin
   */
  async getAllArticles(req, res, next) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        status: req.query.status,
        categoryId: req.query.categoryId,
        search: req.query.search,
        authorId: req.query.authorId
      };
      const result = await articleService.getAllArticles(options, req.user);
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get article by ID
   * GET /api/articles/:id
   */
  async getArticleById(req, res, next) {
    try {
      const includeUnpublished = req.user && ['admin', 'editor'].includes(req.user.role);
      const article = await articleService.getArticleById(req.params.id, includeUnpublished);
      res.json({
        success: true,
        data: { article }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get article by slug
   * GET /api/articles/slug/:slug
   */
  async getArticleBySlug(req, res, next) {
    try {
      const article = await articleService.getArticleBySlug(req.params.slug);
      res.json({
        success: true,
        data: { article }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new article
   * POST /api/articles
   */
  async createArticle(req, res, next) {
    try {
      const article = await articleService.createArticle(req.body, req.user.id, req.user.role);
      res.status(201).json({
        success: true,
        message: 'Article created successfully',
        data: { article }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update article
   * PUT /api/articles/:id
   */
  async updateArticle(req, res, next) {
    try {
      const article = await articleService.updateArticle(req.params.id, req.body, req.user);
      res.json({
        success: true,
        message: 'Article updated successfully',
        data: { article }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete article
   * DELETE /api/articles/:id
   */
  async deleteArticle(req, res, next) {
    try {
      const result = await articleService.deleteArticle(req.params.id, req.user);
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get featured articles
   * GET /api/articles/featured
   */
  async getFeaturedArticles(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const articles = await articleService.getFeaturedArticles(limit);
      res.json({
        success: true,
        data: { articles }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get latest articles
   * GET /api/articles/latest
   */
  async getLatestArticles(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const articles = await articleService.getLatestArticles(limit);
      res.json({
        success: true,
        data: { articles }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ArticleController();
