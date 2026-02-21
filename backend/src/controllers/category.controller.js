const { categoryService } = require('../services');

class CategoryController {
  /**
   * Get all categories
   * GET /api/categories
   */
  async getAllCategories(req, res, next) {
    try {
      const options = {
        includeInactive: req.query.includeInactive === 'true',
        includeArticleCount: req.query.includeArticleCount === 'true'
      };
      const categories = await categoryService.getAllCategories(options);
      res.json({
        success: true,
        data: { categories }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get category by ID
   * GET /api/categories/:id
   */
  async getCategoryById(req, res, next) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      res.json({
        success: true,
        data: { category }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get category by slug
   * GET /api/categories/slug/:slug
   */
  async getCategoryBySlug(req, res, next) {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);
      res.json({
        success: true,
        data: { category }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new category (admin only)
   * POST /api/categories
   */
  async createCategory(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: { category }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update category (admin only)
   * PUT /api/categories/:id
   */
  async updateCategory(req, res, next) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      res.json({
        success: true,
        message: 'Category updated successfully',
        data: { category }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete category (admin only)
   * DELETE /api/categories/:id
   */
  async deleteCategory(req, res, next) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
